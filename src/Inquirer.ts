import * as inquirer from "inquirer";
import {concatAndWriteFile, read, Todo, todoKind} from "./Todo";
import {show} from "./View";

const QUESTIONS = [
  {
    type: "list",
    name: "todoKind",
    message: "todoKind",
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

export const addTodo = () => {
  inquirer
    .prompt(
      QUESTIONS
    )
    .then((answers: any) => {
      const {todoKind, content, deadline} = answers;
      const newId = read().size + 1;
      const propsWithoutId: {
        todoKind: todoKind;
        content: string;
        deadline: any;
        done: boolean;
        deleted: boolean;
        updateAt: any;
      } = {
        todoKind,
        content,
        deadline,
        done: false,
        deleted: false,
        updateAt: 123
      };
      const props = Object.assign({id: newId}, propsWithoutId);
      const todo = new Todo(props);
      concatAndWriteFile(todo);
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