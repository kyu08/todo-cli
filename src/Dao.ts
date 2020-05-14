import fs from "fs";
import {path} from "./App";

export const writeFile = (todoMap: Map<any, any>): void => {
  fs.writeFileSync(path, JSON.stringify(Array.from(todoMap)));
}