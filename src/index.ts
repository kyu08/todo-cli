// todo class でかこうぜ
import * as fs from "fs";
import table from "./table";


type taskType = "daily" | "oneShot";

interface taskInterface {
  id: number;
  taskType: taskType;
  content: string;
  deadline: any;
  done: boolean;
}

const path = "task.json";
const task: taskInterface = {
  id: 1,
  taskType: "daily",
  content: "hoge",
  deadline: "tomorrow",
  done: false
}

const read = (): any[] => {
  const data = fs.readFileSync(path, "utf-8")
  if (!data) return [];
  return JSON.parse(data);
}

const concatTask = (task: any): any => {
  return read().concat(task);
}

const writeFile = (tasks: any[]): void => {
  fs.writeFileSync(path, JSON.stringify(tasks));
}

// const header = ["id", "done", "taskType", "content", "deadline"];
const show = () => {
    read().map(t => {
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
// console.log(show());
// console.log("=======");
// console.log(read());
// const newTasks = concatTask(task);
// writeFile(newTasks);
// console.log("=======");
// console.log(read());
show();
