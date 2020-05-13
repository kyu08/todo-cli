export type taskKind = "daily" | "oneShot";
export type TaskType = TaskProps & {};

export interface ValueProps {
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
}

export type TaskProps = ValueProps & {
  id: number;
}

export class Task implements TaskType {
  id: number;
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;

  constructor(props: TaskProps) {
    const {id, taskKind, content, deadline, done, deleted} = props;
    this.id = id;
    this.taskKind = taskKind;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
  }
}