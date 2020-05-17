import { read } from './Todo';
import { writeFile } from '../dao/Dao';

export const hasNoTodo = (id: number): boolean => {
  const todoMap = read();

  return !todoMap.has(id);
};

export const searchTodo = (id: number): any => {
  const todoMap = read();
  const todo = todoMap.get(id);

  return todo;
};

export const updateDone = (id: number): void => {
  if (hasNoTodo(id)) return;
  const message = 'Made it done! ';
  const todoMap = read();
  const todo = searchTodo(id);
  const newTodo = todo.doneTodo();
  const newTodoMap = todoMap.set(id, newTodo);
  writeFile(newTodoMap);
  console.log(`${message}(id: ${id})`);
};

export const updateDelete = (id: number): void => {
  if (Number.isNaN(id)) return;
  if (hasNoTodo(id)) return;
  const message = 'Deleted todo! ';
  const todoMap = read();
  const todo = searchTodo(id);
  const newTodo = todo.deleteTodo();
  const newTodoMap = todoMap.set(id, newTodo);
  writeFile(newTodoMap);
  console.log(`${message}(id: ${id})`);
};
