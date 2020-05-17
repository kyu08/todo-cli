import { read, TodoInterface } from './Todo';
import { updateFile } from '../dao/Dao';

export const hasNoTodo = (id: number): boolean => {
  const todoMap = read();

  return !todoMap.has(id);
};

export const searchTodo = (id: number): any => {
  const todoMap = read();
  const todo = todoMap.get(id);

  return todo;
};

export const updateBoolean = (
  id: number,
  todoUpdated: TodoInterface,
  message: string,
): void => {
  const todoMap = read();
  updateFile(todoMap.set(id, todoUpdated));
  console.log(`${message}(id: ${id})`);
};

// 本当はこう書きたい
// export const updateBooleanReal = (
//   id: number,
//   updateFunction: any,
//   message: string,
// ): void => {
//   if (hasNoTodo(id)) return;
//   if (informNaN(id)) return;
//   const todo = searchTodo(id);
//   const todoUpdated = todo.updateFunction();
//   const todoMap = read();
//   writeFile(todoMap.set(id, todoUpdated));
//   console.log(`${message}(id: ${id})`);
// };
//
// updateBooleanReal(1, deleteTodo, 'hoge');
