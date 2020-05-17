import * as inquirer from 'inquirer';
import { updateMapAndFile, returnTodoMap, Todo, TodoProps } from './Todo';
import { show } from '../View';
import { returnDate } from './Date';

const QUESTIONS = [
  {
    type: 'list',
    name: 'todoKind',
    message: 'Choose a todoKind',
    choices: ['daily', 'oneShot'],
  },
  {
    name: 'content',
    message: 'content: string',
  },
  {
    name: 'deadline',
    message: 'deadline: any',
  },
];

export const addTodo = () => {
  inquirer
    .prompt(QUESTIONS)
    .then((answers: any) => {
      const { todoKind, content, deadline } = answers;
      const todoMap = returnTodoMap();
      const newId = todoMap.size + 1;
      const props: TodoProps = {
        id: newId,
        todoKind,
        content,
        deadline,
        done: false,
        deleted: false,
        updateAt: returnDate(),
      };
      const todo = new Todo(props);
      updateMapAndFile(todo);
      show();
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
};
