import { read, TodoInterface } from './Todo';
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

export const updateBoolean = (
  id: number,
  todoUpdated: TodoInterface,
  message: string,
): void => {
  if (hasNoTodo(id)) return;
  const todoMap = read();
  writeFile(todoMap.set(id, todoUpdated));
  console.log(`${message}(id: ${id})`);
};
