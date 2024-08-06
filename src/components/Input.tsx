import React, { useState } from 'react';

interface InputProps {
  onAddTodo: (todo: string) => void;
}

const Input: React.FC<InputProps> = ({ onAddTodo }) => {
  const [valor, setValor] = useState('');

  const handleAdd = () => {
    if (valor.trim()) {
      onAddTodo(valor);
      setValor('');
    }
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Adicione uma nova tarefa"
      />
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white p-2"
      >
        Adicionar
      </button>
    </div>
  );
};

export default Input;
