import cac from 'cac';
import { addTodo } from './Inquirer';
import { updateProp } from './TodoMap';
import { executeShowTable } from '../View';
import { TodoPropType, updateMapAndFile } from './Todo';

const cli = cac();

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo()
      .then(todo => {
        updateMapAndFile(todo);
        executeShowTable();
      })
      .catch(e => {
        console.log(e);
      });
  });

  cli
    .command('done [idString]', 'Enter todo id which you want to be done.')
    .action(idString => {
      type T = boolean;
      const prop: TodoPropType = 'isDone';
      const message = 'Done Todo!';
      const value: T = true;
      updateProp<T>(idString, prop, value, message);
      executeShowTable();
    });

  cli
    .command('delete [idString]', 'Enter todo id which you want to be deleted.')
    .action(idString => {
      type T = boolean;
      const prop: TodoPropType = 'isDeleted';
      const message = 'Deleted Todo!';
      const value: T = true;
      updateProp<T>(idString, prop, value, message);
      executeShowTable();
    });

  cli.command('show', 'show todo-list').action(() => {
    executeShowTable();
  });

  cli.help();
  cli.parse();
};
