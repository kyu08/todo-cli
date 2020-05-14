import * as inquirer from "inquirer";
import {concatAndWriteFile, read, Todo, taskKind} from "./Todo";
import {show} from "./View";

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
      const task = new Todo(props);
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