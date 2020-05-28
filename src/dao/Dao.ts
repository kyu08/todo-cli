import fs from 'fs';
// eslint-disable-next-line import/no-cycle
import { TodoProps } from '../models/Todo';

const homeDirectoryPath = process
  .cwd()
  .split('/')
  .slice(0, 3)
  .join('/');

const filePath = `${homeDirectoryPath}/.great-todo-cli/todo.json`;
const appRootPath = `${homeDirectoryPath}/.great-todo-cli`;

export const sureDirectoryExist = (): void => {
  if (!fs.existsSync(appRootPath)) {
    fs.mkdirSync(appRootPath);
    console.log(`App Root Directory generated. -> ${appRootPath} `);
    console.log(`todo.json is stored in -> ${appRootPath}.`);
  }
};

export const sureJSONExist = (): void => {
  try {
    fs.statSync(filePath);

    return;
  } catch (e) {
    if (e.code === 'ENOENT') {
      fs.writeFileSync(filePath, '');
      console.log('todo.json generated.');
    }
  }
};

export const updateFile = (todoMap: Map<number, TodoProps>): void => {
  fs.writeFileSync(filePath, JSON.stringify(Array.from(todoMap)));
};

export const loadFile = (): string => {
  return fs.readFileSync(filePath, 'utf-8');
};
