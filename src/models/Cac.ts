import cac from 'cac';
import { addTodo } from './Inquirer';
import { updateProp } from './TodoMap';
import { show } from '../View';
import { TodoPropType, updateMapAndFile } from './Todo';

const cli = cac();

export const bootCac = () => {
  cli.command('add', 'Enter todo id which you want to be done.').action(() => {
    addTodo()
      .then(todo => {
        updateMapAndFile(todo);
        show();
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
      show();
    });

  cli
    .command('delete [idString]', 'Enter todo id which you want to be deleted.')
    .action(idString => {
      type T = boolean;
      const prop: TodoPropType = 'isDeleted';
      const message = 'Deleted Todo!';
      const value: T = true;
      updateProp<T>(idString, prop, value, message);
      show();
    });

  cli.command('show', 'show todo-list').action(() => {
    show();
  });

  cli.help();
  cli.parse();
};
