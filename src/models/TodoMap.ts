import {read} from "./Todo";

export const hasNoTodo = (id: number): boolean => {
  const todoMap = read();
  return !todoMap.has(id);
}

export const searchTodo = (id: number): any => {
  const todo = read().get(id);
  return todo;
}
