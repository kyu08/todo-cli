import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { TodoProps } from '../models/Todo';

export const path = 'todo.json';

export const sureJSONExist = () => {
  try {
    fs.statSync(path);

    return;
  } catch (e) {
    if (e.code === 'ENOENT') {
      fs.writeFileSync(path, '');
      console.log('todo.json generated.');
    }
  }
};

export const updateFile = (todoMap: Map<number, TodoProps>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(todoMap)));
};

export const loadFile = (): string => {
  return fs.readFileSync(path, 'utf-8');
};
