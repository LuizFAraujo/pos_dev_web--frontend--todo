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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Input onAddTodo={handleAddTodo} />
      <List
        todos={todos}
        onToggleTodo={(id) => handleToggleTodo(id)}
        onRemoveTodo={(id) => handleRemoveTodo(id)}
      />
    </div>
  );
};

export default App;
