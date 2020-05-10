// todo 他にどんなクラスが必要？ ファイル操作のclass とか？
import * as fs from "fs";
import * as inquirer from "inquirer";
import {tableNomal, tableForDebug } from "./table";

type taskKind = "daily" | "oneShot";
type TaskType = TaskProps & {};

interface TaskProps {
  id: number;
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
}

const path = "task.json";
const testDataArray: TaskProps[] = [
  {
    id: 1,
    taskKind: "daily",
    content: "hoge",
    deadline: "tomorrow",
    done: false,
    deleted: false
  },
  {
    id: 2,
    taskKind: "oneShot",
    content: "ababa",
    deadline: "kinou",
    done: true,
    deleted: false
  }
];

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
    const {id, taskKind, content, deadline, done} = t;
    const taskShaped = [id, convertBool(done), taskKind, content, deadline];
    return table.push(taskShaped);
  });
  console.log(table.toString());
}

const convertBool = (bool: boolean): string => {
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
    const {id, taskKind, content, deadline, done, deleted} = t;
    const taskShaped = [id, convertBool(done), taskKind, content, deadline, deleted];
    return table.push(taskShaped);
  });
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
    // if (answers.taskKind === "daily") {
    //   const {taskKind, content, deadline} = answers;
    // }
    const {taskKind, content, deadline} = answers;
    const newId = read().length + 1;
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
