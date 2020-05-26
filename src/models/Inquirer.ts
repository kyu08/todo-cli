import * as inquirer from 'inquirer';
import { passNewTodoToInquirer, TodoInterface } from './Todo';

const QUESTIONS = [
  {
    type: 'list',
    name: 'todoCategory',
    message: 'Choose a todoCategory.',
    choices: ['daily', 'oneShot'],
  },
  {
    name: 'content',
    message: 'Enter todo content.\n(半角文字で入力してください)',
  },
  {
    name: 'deadline',
    message: 'Enter deadline.',
  },
];

// 対話形式で todo の情報を受け取り、todo インスタンスの生成をし、
//  file を更新、最後に最新のtodoTableを表示する。
// ここどうやったらany消せるんだろう...って思ったけどinquirerな部分だから信頼してもいいか。
// any を消す目的は安全なコードにすることだけどそこはinquirerに任せればいいか。。
export const addTodo = (): Promise<any> => {
  return inquirer
    .prompt(QUESTIONS)
    .then(
      (answers: any): Promise<TodoInterface> => {
        const todo: TodoInterface = passNewTodoToInquirer(answers);

        return new Promise(resolve => {
          resolve(todo);
        });
      },
    )
    .catch(error => {
      if (error.isTtyError) {
        console.log(error);
      } else {
        console.log(error);
      }
    });
};
