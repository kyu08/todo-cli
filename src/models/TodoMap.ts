// eslint-disable-next-line import/no-cycle
import { returnTodoMap, TodoInterface, TodoPropType } from './Todo';
// eslint-disable-next-line import/no-cycle
import { updateFile } from '../dao/Dao';
// eslint-disable-next-line import/no-cycle
import { executeShowTable } from '../View';

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
  todoUpdated: TodoInterface,
  message: string,
): void => {
  const todoMap = returnTodoMap();
  const { id } = todoUpdated;
  updateFile(todoMap.set(id, todoUpdated));
  console.log(`${message}(id: ${id})`);
};

export const guardIncorrectId = (id: number): boolean => {
  if (Number.isNaN(id) || hasNoTodo(id)) {
    console.log(
      `
        ID you entered was incorrect.
        Nothing updated.
      `,
    );

    return true;
  }

  return false;
};

export const updateProp = <T>({
  idString,
  prop,
  value,
  message,
}: {
  idString: string;
  prop: TodoPropType;
  value: T;
  message: string;
}) => {
  const id = Number(idString);
  if (guardIncorrectId(id)) return;
  const todo = searchTodo(id);
  const newTodo = todo.returnUpdatedInstance(prop, value);
  setEntryToMap(newTodo, message);
  executeShowTable();
};

export const executeDoneProp = (idString: string): void => {
  const prop: TodoPropType = 'isDone';
  const value = true;
  const message = 'Done Todo!';
  updateProp<boolean>({ idString, prop, value, message });
};

export const executeDeleteProp = (idString: string): void => {
  const prop: TodoPropType = 'isDeleted';
  const value = true;
  const message = 'Deleted Todo!';
  updateProp<boolean>({ idString, prop, value, message });
};
