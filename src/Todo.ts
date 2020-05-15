import fs from "fs";
import {path} from "./App";
import {writeFile} from "./Dao";
import {returnDate} from "./Date";

export type todoKind = "daily" | "oneShot";

export interface TodoProps {
  id: number;
  todoKind: todoKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: string;
}

export interface TodoInterface extends TodoProps {
  deleteTodo(): TodoProps;
  doneTodo(): TodoProps;
}

export class Todo implements TodoInterface {
  id: number;
  todoKind: todoKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: string;

  constructor(props: TodoProps) {
    const {id, todoKind, content, deadline, done, deleted, updateAt} = props;
    this.id = id;
    this.todoKind = todoKind;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
    this.updateAt = updateAt;
  }

  doneTodo = (): TodoProps => {
    const todo = new Todo({
      ...this, ...{done: true}, ...{updateAt: returnDate()}
    });
    return todo;
  }

  deleteTodo = (): TodoProps => {
    const todo = new Todo({
      ...this, ...{deleted: true}, ...{updateAt: returnDate()}
    });
    return todo;
  }
}

export const read = (): Map<number,TodoProps> => {
  const data = fs.readFileSync(path, "utf-8")
  if (data === "{}" || data === "") return new Map();
  const parsedData = JSON.parse(data);
  const todoMap: Map<number, TodoProps> = new Map(parsedData);
  todoMap.forEach((v: TodoProps, k: number, map: Map<number, TodoProps>) => {
    map.set(k, new Todo(v));
  });
  return todoMap;
}

export const concatTodo = (todo: TodoProps): Map<number, TodoProps> => {
  const todoMap = read();
  const {id} = todo;
  return todoMap.set(id, todo);
}

// todo updateFile みたいな関数つくりたい
export const concatAndWriteFile = (todo: TodoProps): void => {
  const newTodos = concatTodo(todo);
  writeFile(newTodos);
}