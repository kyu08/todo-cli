// todo class でかこうぜ
import * as fs from "fs";

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

const read = (): any => {
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

const show = () => {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) console.log(err);
    const dataParsed: taskInterface[] = JSON.parse(data);
    dataParsed.map(t => {
      const {id, taskType, content, deadline, done} = t;
      console.log(id, taskType, content, deadline, done);
    })
    console.log(data);
  });
}

console.log("=======");
console.log(read());
const newTasks = concatTask(task);
writeFile(newTasks);
console.log("=======");
console.log(read());