// todo class でかこうぜ
import * as fs from "fs";
import {tableNomal, tableForDebug } from "./table";

type taskType = "daily" | "oneShot";

interface TaskProps {
  id: number;
  taskType: taskType;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
}

const path = "task.json";
const testDataArray: TaskProps[] = [
  {
    id: 1,
    taskType: "daily",
    content: "hoge",
    deadline: "tomorrow",
    done: false,
    deleted: false
  },
  {
    id: 2,
    taskType: "oneShot",
    content: "ababa",
    deadline: "kinou",
    done: true,
    deleted: false
  }
];

const read = (): TaskProps[] => {
  const data = fs.readFileSync(path, "utf-8")
  if (!data) return [];
  return JSON.parse(data);
}

const concatTask = (task: any): any => {
  return read().concat(task);
}

// todo 差分書き換えとかできるのかな
const writeFile = (tasks: any[]): void => {
  fs.writeFileSync(path, JSON.stringify(tasks));
}

const concatAndWriteFile = (task: any): void => {
  const newTasks = concatTask(task);
  writeFile(newTasks);
}

const show = () => {
  const table = tableNomal
  read().map(t => {
    if (t.deleted) return table;
    const {id, taskType, content, deadline, done} = t;
    const taskShaped = [id, convertBool(done), taskType, content, deadline];
    return table.push(taskShaped);
  });
  console.log(table.toString());
}

const  convertBool = (bool: boolean): string => {
  if(bool) return "done!";
  return "not yet...";
}

const deleteTask = (id: number): void => {
  const tasks = read();
  let task: any | null = tasks.find(t => t.id === id)
  if (typeof task === "object") {
    task.deleted = true;
    const newTasks = tasks;
    writeFile(newTasks);
  }
}

const debug = () => {
  const table = tableForDebug
  read().map(t => {
    const {id, taskType, content, deadline, done, deleted} = t;
    const taskShaped = [id, convertBool(done), taskType, content, deadline, deleted];
    return table.push(taskShaped);
  });
  console.log(table.toString());
}

debug();
