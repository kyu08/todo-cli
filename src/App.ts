import { bootCac } from './models/Cac';
import { executeInitializeDailyTodo } from './models/TodoMap';
import { sureDirectoryExist, sureJSONExist } from './dao/Dao';

export class App {
  mount = (): void => {
    sureDirectoryExist();
    sureJSONExist();
    executeInitializeDailyTodo();
    bootCac();
  };
}
