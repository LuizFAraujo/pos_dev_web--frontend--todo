import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';
import { fetchTodos } from './data/api';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState<number>(16);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
        setNextId(data.length + 1);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = () => {
    const newTodoItem: Todo = {
      id: nextId,
      todo: newTodo,
      completed: false,
      userId: 26,
    };
    setTodos([...todos, newTodoItem]);
    setNextId(nextId + 1);
    setNewTodo('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <Header />
      </header>

      <main className="flex-1 pt-20 pb-24 px-4 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg mb-4 p-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
              placeholder="Nova tarefa"
            />
            <button
              onClick={handleAddTodo}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <List
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onRemoveTodo={handleRemoveTodo}
          />
        </div>
      </main>

      <footer className="bg-teal-800 text-white p-3 fixed bottom-0 left-0 w-full text-center shadow-lg">
        <p className="text-lg font-semibold">
          <span className="mx-4">Total de tarefas: {totalCount}</span>
          <span className="mx-4">Concluídas: {completedCount}</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
