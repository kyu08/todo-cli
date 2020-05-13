// todo 他にどんなクラスが必要？ ファイル操作のclass とか？
import * as fs from "fs";
import * as inquirer from "inquirer";
import {tableNomal, tableForDebug } from "./table";
import cac from 'cac'
import {Task, taskKind} from "./Task";

const path = "task.json";
const cli = cac()

export const read = (): Map<any,any> => {
  const data = fs.readFileSync(path, "utf-8")
  if (data === "{}" || data === "") return new Map();
  const parsedData = JSON.parse(data);
  // ここで Task instance を return したい！！！！
  // ここから！！！！！！！！！！！！！！！！
  return new Map([...parsedData]);
}

const concatTask = (task: any): any => {
  const tasks = read();
  const {id} = task;
  delete task.id;
  return tasks.set(id, task);
}

export const writeFile = (tasks: Map<any, any>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(tasks)));
}

const concatAndWriteFile = (task: any): void => {
  const newTasks = concatTask(task);
  writeFile(newTasks);
}

const show = () => {
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

const convertBool = (bool: boolean): string => {
  if(bool) return "done!";
  return "not yet...";
}

const hasNoTask = (id: number): boolean => {
  const tasks = read();
  return tasks.has(id);
}

const searchTask = (id: number): any => {
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


const addTask = () => {
  inquirer
    .prompt(
      QUESTIONS
    )
    .then((answers: any) => {
      console.log(1);
      const {taskKind, content, deadline} = answers;
      console.log(1.2);
      console.log(read());
      const newId = read().size + 1;
      console.log(2);
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
      console.log(3);
      const props = Object.assign({id: newId}, propsWithoutId);
      const task = new Task(props);
      console.log(task);
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

cli.command('add', 'Enter task id which you want to be done.').action(() => {
  addTask();
  console.log("Added task!");
});

cli.command('done [id]', 'Enter task id which you want to be done.').action(() => {
  const id = process.argv[2];
  console.log(`Made task done!(id: ${id})`);
});

cli.command('delete [id]', 'Enter task id which you want to be done.').action(() => {
  const id = Number(process.argv[2]); // これstring やんけ！
  if (id === NaN) return;
  if (hasNoTask(id)) return;
  const task = searchTask(id);
  const newTasks = task.deteteTask();
  writeFile(newTasks);
  console.log(`Deleted task! (id: ${id})`);
});

cli.command('show', 'show todo-list').action(() => {
  show();
});

cli.help();
cli.parse();