// todo 他にどんなクラスが必要？ ファイル操作のclass とか？
import * as fs from "fs";
import * as inquirer from "inquirer";
import {tableNomal, tableForDebug } from "./table";
import cac from 'cac'
import {Task, taskKind} from "./Task";

const path = "task.json";
const cli = cac()

const read = (): Map<any,any> => {
  const data = fs.readFileSync(path, "utf-8")
  if (data === "{}") return new Map();
  const parsedData = JSON.parse(data);
  return new Map([...parsedData]);
}

const concatTask = (task: any): any => {
  const tasks = read();
  const {id} = task;
  delete task.id;
  return tasks.set(id, task);
}

const writeFile = (tasks: Map<any, any>): void => {
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

const deleteTask = (id: number): void => {
  const tasks = read();
  let task: any | null = tasks.get(id);
  if (typeof task === "object") {
    task.deleted = true;
    tasks.set(id, task);
    writeFile(tasks);
  }
}

const debug = () => {
  const table = tableForDebug;
  read().forEach((k, v) => {
    const id = k;
    const {taskKind, content, deadline, done, deleted} = v;
    const taskShaped = [id, convertBool(done), taskKind, content, deadline, deleted];
    return table.push(taskShaped);
  })
  console.log(table.toString());
}

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
      const {taskKind, content, deadline} = answers;
      const newId = read().size + 1;
      const otherProps: {
        done: boolean;
        deleted: boolean;
      } = {
        done: false,
        deleted: false
      };
      const mainProps: {
        taskKind: taskKind,
        content: string,
        deadline: any
      } = {
        taskKind,
        content,
        deadline
      }
      const props = Object.assign({id: newId}, mainProps, otherProps);
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

cli.command('add', 'Enter task id which you want to be done.').action(() => {
  addTask();
});

cli.command('done [id]', 'Enter task id which you want to be done.').action(() => {
  console.log(process.argv[2]);
});

cli.command('delete [id]', 'Enter task id which you want to be done.').action(() => {
  //
});

cli.command('show', 'show todo-list').action(() => {
  show();
});

cli.help();
cli.parse();