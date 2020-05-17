import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { TodoProps } from '../models/Todo';

export const path = 'todo.json';

export const writeFile = (todoMap: Map<number, TodoProps>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(todoMap)));
};
