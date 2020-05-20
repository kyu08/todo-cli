import { returnTodoMap, TodoInterface } from './Todo';
import { updateFile } from '../dao/Dao';

export const hasNoTodo = (id: number): boolean => {
  const todoMap = returnTodoMap();

  return !todoMap.has(id);
};

export const searchTodo = (id: number): any => {
  const todoMap = returnTodoMap();
  const todo = todoMap.get(id);

  return todo;
};

export const setEntryToMap = (
  id: number,
  todoUpdated: TodoInterface,
  message: string,
): void => {
  const todoMap = returnTodoMap();
  updateFile(todoMap.set(id, todoUpdated));
  console.log(`${message}(id: ${id})`);
};

export const guardIncorrectId = (id: number): boolean => {
  if (Number.isNaN(id) || hasNoTodo(id)) {
    console.log('ID you entered was incorrect.');

    return true;
  }

  return false;
};

export const updateProp = <T>(
  idString: string,
  prop: string,
  value: T,
  message: string,
) => {
  const id = Number(idString);
  const todo = searchTodo(id);
  // todo prop の判定もするべき
  const newTodo = todo.returnUpdatedInstance(prop, value);
  if (guardIncorrectId(id)) return;
  setEntryToMap(id, newTodo, message);
};
