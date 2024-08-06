import React from 'react';

interface ListProps {
    todos: { id: number; todo: string; completed: boolean }[];
    onToggleTodo: (id: number) => void;
    onRemoveTodo: (id: number) => void;
}

const List: React.FC<ListProps> = ({ todos, onToggleTodo, onRemoveTodo }) => {
    return (
        <ul className="p-4 overflow-y-auto">
            {todos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggleTodo(todo.id)}
                            className="form-checkbox h-5 w-5 text-teal-600"
                        />
                        <span
                            className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        >
                            {todo.todo}
                        </span>
                    </div>
                    <button
                        onClick={() => onRemoveTodo(todo.id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                        Remover
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default List;
