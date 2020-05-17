import * as inquirer from 'inquirer';
import { updateMapAndFile, returnTodoMap, Todo, TodoProps } from './Todo';
import { show } from '../View';
import { returnDate } from './Date';

const QUESTIONS = [
  {
    type: 'list',
    name: 'todoCategory',
    message: 'Choose a todoCategory',
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
      const { todoCategory, content, deadline } = answers;
      const todoMap = returnTodoMap();
      const newId = todoMap.size + 1;
      const props: TodoProps = {
        id: newId,
        todoCategory,
        content,
        deadline,
        isDone: false,
        isDeleted: false,
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
