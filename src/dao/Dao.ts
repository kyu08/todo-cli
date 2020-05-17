import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { TodoProps } from '../models/Todo';

export const path = 'todo.json';

export const updateFile = (todoMap: Map<number, TodoProps>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(todoMap)));
};

export const loadFile = (): string => {
  return fs.readFileSync(path, 'utf-8');
};
