import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState<number>(16); // Começar do ID 16

  useEffect(() => {
    // Função para buscar dados de tarefas
    const fetchTodos = async () => {
      try {
        const response = await fetch('/src/data/tasks.json');
        const data: Todo[] = await response.json();
        setTodos(data);
        setNextId(data.length + 1); // Ajusta o próximo ID
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: nextId,
      todo: text,
      completed: false,
      userId: 26,
    };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1); // Atualiza o próximo ID
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
      <header className="bg-teal-600 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <Header />
      </header>

      <main className="flex-1 pt-20 pb-24 px-4 flex flex-col bg-white">
        <div className="bg-gray-100 rounded-lg shadow-md mb-4 p-4">
          <Input onAddTodo={handleAddTodo} />
        </div>
        <div className="flex-1 overflow-auto">
          <List
            todos={todos}
            onToggleTodo={(id) => handleToggleTodo(id)}
            onRemoveTodo={(id) => handleRemoveTodo(id)}
          />
        </div>
      </main>

      <footer className="bg-teal-700 text-white p-4 fixed bottom-0 left-0 w-full text-center shadow-md">
        <p className="text-sm font-medium">
          {`Total de tarefas: ${totalCount} | Concluídas: ${completedCount}`}
        </p>
      </footer>
    </div>
  );
};

export default App;
