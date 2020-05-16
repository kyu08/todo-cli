import {read} from "./Todo";

export const hasNoTodo = (id: number): boolean => {
  const todoMap = read();
  return !todoMap.has(id);
}

export const searchTodo = (id: number): any => {
  const todoMap = read();
  const todo = todoMap.get(id);
  return todo;
}
