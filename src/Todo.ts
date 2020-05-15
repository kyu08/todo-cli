import fs from "fs";
import {path} from "./App";
import {writeFile} from "./Dao";

export type todoKind = "daily" | "oneShot";

export interface ValueProps {
  todoKind: todoKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: any;
}

export type TaskProps = ValueProps & {
  id: number;
}

export type TaskType = TaskProps & {
  deleteTodo(): any;
};

export class Todo implements TaskType {
  id: number;
  todoKind: todoKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: any;

  constructor(props: TaskProps) {
    const {id, todoKind, content, deadline, done, deleted, updateAt} = props;
    this.id = id;
    this.todoKind = todoKind;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
    this.updateAt = updateAt;
  }

  deleteTodo = (): any => {
    const {id, todoKind, content, deadline, done, updateAt} = this;
    // todo うごくようになったら　{...this, ...{deleted: true}} をためす
    const todo = new Todo({
      id,
      todoKind,
      content,
      deadline,
      done,
      deleted: true,
      updateAt,
    })
    return todo;
  }
}

export const read = (): Map<any,any> => {
  const data = fs.readFileSync(path, "utf-8")
  if (data === "{}" || data === "") return new Map();
  const parsedData = JSON.parse(data);
  const todoMap: Map<number, TaskProps> = new Map(parsedData);
  todoMap.forEach((v: TaskProps, k: number, map: Map<number, TaskProps>) => {
    map.set(k, new Todo(v));
  });
  return todoMap;
}

export const concatTodo = (todo: any): any => {
  const todoMap = read();
  const {id} = todo;
  return todoMap.set(id, todo);
}

// todo updateFile みたいな関数つくりたい
export const concatAndWriteFile = (todo: any): void => {
  const newTasks = concatTodo(todo);
  writeFile(newTasks);
}