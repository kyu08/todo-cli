import fs from "fs";
import {path} from "./App";
import {writeFile} from "./Dao";

export type taskKind = "daily" | "oneShot";

export interface ValueProps {
  taskKind: taskKind;
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
  deleteTask(): any;
};

export class Todo implements TaskType {
  id: number;
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: any;

  constructor(props: TaskProps) {
    const {id, taskKind, content, deadline, done, deleted, updateAt} = props;
    this.id = id;
    this.taskKind = taskKind;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
    this.updateAt = updateAt;
  }

  deleteTask = (): any => {
    const task = new Todo({
      id: this.id,
      taskKind: this.taskKind,
      content: this.content,
      deadline: this.deadline,
      done: this.done,
      deleted: this.deleted,
      updateAt: this.updateAt
    })
    return task;
  }
}

export const read = (): Map<any,any> => {
  //
  const data = fs.readFileSync(path, "utf-8")
  if (data === "{}" || data === "") return new Map();
  const parsedData = JSON.parse(data);
  const tasks: Map<number, TaskProps> = new Map(parsedData);
  tasks.forEach((v: TaskProps, k: number, map: Map<number, TaskProps>) => {
    map.set(k, new Todo(v));
  });
  return tasks;
}

export const concatTask = (task: any): any => {
  const tasks = read();
  const {id} = task;
  delete task.id;
  return tasks.set(id, task);
}

export const concatAndWriteFile = (task: any): void => {
  const newTasks = concatTask(task);
  writeFile(newTasks);
}