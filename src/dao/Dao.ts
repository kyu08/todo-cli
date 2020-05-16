import fs from "fs";
import {path} from "../App";
import {TodoProps} from "../models/Todo";

export const writeFile = (todoMap: Map<number, TodoProps>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(todoMap)));
}