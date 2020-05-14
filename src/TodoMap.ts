import {read} from "./Todo";

export const hasNoTask = (id: number): boolean => {
  const tasks = read();
  return tasks.has(id);
}

export const searchTask = (id: number): any => {
  const task = read().get(id);
  return task;
}
