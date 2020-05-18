import * as inquirer from 'inquirer';
import { updateMapAndFile, passNewTodoToInquirer } from './Todo';
import { show } from '../View';

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

// 対話形式で todo の情報を受け取り、todo インスタンスの生成をし、
//  file を更新、最後に最新のtodoTableを表示する。
export const addTodo = () => {
  inquirer
    .prompt(QUESTIONS)
    .then((answers: any) => {
      const todo = passNewTodoToInquirer(answers);
      updateMapAndFile(todo);
      show();
    })
    .catch(error => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
      }
    });
};
