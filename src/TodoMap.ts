import {read} from "./Todo";

export const hasNoTodo = (id: number): boolean => {
  const tasks = read();
  return tasks.has(id);
}

export const searchTodo = (id: number): any => {
  const todo = read().get(id);
  return todo;
}
