// todo 他にどんなクラスが必要？ ファイル操作のclass とか？
import * as fs from "fs";
import * as inquirer from "inquirer";
import {tableNomal, tableForDebug } from "./table";
import {Task, taskKind, TaskProps} from "./Task";
import {bootCac} from "./Cac";

const path = "task.json";

export class App {
  mount = () => {
    bootCac();
  }
}

export const read = (): Map<any,any> => {
  const data = fs.readFileSync(path, "utf-8")
  if (data === "{}" || data === "") return new Map();
  const parsedData = JSON.parse(data);
  const tasks: Map<number, TaskProps> = new Map(parsedData);
  tasks.forEach((v: TaskProps, k: number, map: Map<number, TaskProps>) => {
    map.set(k, new Task(v));
  });
  return tasks;
}

export const concatTask = (task: any): any => {
  const tasks = read();
  const {id} = task;
  delete task.id;
  return tasks.set(id, task);
}

export const writeFile = (tasks: Map<any, any>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(tasks)));
}

export const concatAndWriteFile = (task: any): void => {
  const newTasks = concatTask(task);
  writeFile(newTasks);
}

export const show = () => {
  const table = tableNomal;
  read().forEach((v, k) => {
    if (v.deleted) return table;
    const id = k;
    const {taskKind, content, deadline, done} = v;
    const taskShaped = [id, convertBool(done), taskKind, content, deadline];
    return table.push(taskShaped);
  })
  console.log(table.toString());
}

export const convertBool = (bool: boolean): string => {
  if(bool) return "done!";
  return "not yet...";
}

export const hasNoTask = (id: number): boolean => {
  const tasks = read();
  return tasks.has(id);
}

export const searchTask = (id: number): any => {
  const task = read().get(id);
  return task;
}

// const debug = () => {
//   const table = tableForDebug;
//   read().forEach((k, v) => {
//     const id = k;
//     const {taskKind, content, deadline, done, deleted} = v;
//     const taskShaped = [id, convertBool(done), taskKind, content, deadline, deleted];
//     return table.push(taskShaped);
//   })
//   console.log(table.toString());
// }

const QUESTIONS = [
  {
    type: "list",
    name: "taskKind",
    message: "taskKind",
    choices: ["daily", "oneShot"]
  },
  {
    name: "content",
    message: "content: string"
  },
  {
    name: "deadline",
    message: "deadline: any"
  }
];


export const addTask = () => {
  inquirer
    .prompt(
      QUESTIONS
    )
    .then((answers: any) => {
      const {taskKind, content, deadline} = answers;
      const newId = read().size + 1;
      const propsWithoutId: {
        taskKind: taskKind;
        content: string;
        deadline: any;
        done: boolean;
        deleted: boolean;
        updateAt: any;
      } = {
        taskKind,
        content,
        deadline,
        done: false,
        deleted: false,
        updateAt: 123
      };
      const props = Object.assign({id: newId}, propsWithoutId);
      const task = new Task(props);
      concatAndWriteFile(task);
      show();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}