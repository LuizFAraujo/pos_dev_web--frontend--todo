import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data.todos;
};


// export const addTodo = async (newTodo: Omit<any, 'id'>) => {
//   const response = await axios.post(API_URL, newTodo);
//   return response.data;
// };

// export const updateTodo = async (id: number, updatedTodo: Partial<any>) => {
//   const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
//   return response.data;
// };

// export const removeTodo = async (id: number) => {
//   await axios.delete(`${API_URL}/${id}`);
// };
