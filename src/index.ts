// todo read() 関係のところ Map 対応
// todo fs 関係のところ Map 対応
// todo 他にどんなクラスが必要？ ファイル操作のclass とか？
import * as fs from "fs";
import * as inquirer from "inquirer";
import {tableNomal, tableForDebug } from "./table";

type taskKind = "daily" | "oneShot";
type TaskType = TaskProps & {};

interface ValueProps {
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
}

type TaskProps = ValueProps & {
  id: number;
}

const path = "task.json";
// const testDataArray: TaskProps[] = [
//   {
//     id: 1,
//     taskKind: "daily",
//     content: "hoge",
//     deadline: "tomorrow",
//     done: false,
//     deleted: false
//   },
//   {
//     id: 2,
//     taskKind: "oneShot",
//     content: "ababa",
//     deadline: "kinou",
//     done: true,
//     deleted: false
//   }
// ];

class Task implements TaskType {
  id: number;
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;

  constructor(props: TaskProps) {
    const {id, taskKind, content, deadline, done, deleted} = props;
    this.id = id;
    this.taskKind = taskKind;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
  }
}

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
  console.log(1);
  const newTasks = concatTask(task);
  console.log(newTasks);
  writeFile(newTasks);
}

const show = () => {
  const table = tableNomal
  read().forEach((k, v) => {
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

const instantiateMap = (v: any[]): Map<any, any> => {
  return new Map([...v]);
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
  const table = tableForDebug
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
    // type: "list",
    name: "content",
    message: "content: string"
  },
  {
    // type: "list",
    name: "deadline",
    message: "deadline: any"
  }
];

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
    console.log(task);
    concatAndWriteFile(task);
    show();
    // todo show() がうまくいかないところから！
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });


// console.log(
//   {id: 1}, {}
//
// );
// import cac from 'cac'
//
// const cli = cac()
//
// cli.command('hello [name]', 'Enter your name').action(() => {
//   "hogehogehogehogehoge"
// })
//
// cli.help()
// cli.parse()
