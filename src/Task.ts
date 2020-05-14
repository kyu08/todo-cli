export type taskKind = "daily" | "oneShot";

export interface ValueProps {
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: any;
}

export type TaskProps = ValueProps & {
  id: number;
}

export type TaskType = TaskProps & {
  deleteTask(): any;
};

export class Task implements TaskType {
  id: number;
  taskKind: taskKind;
  content: string;
  deadline: any;
  done: boolean;
  deleted: boolean;
  updateAt: any;

  constructor(props: TaskProps) {
    const {id, taskKind, content, deadline, done, deleted, updateAt} = props;
    this.id = id;
    this.taskKind = taskKind;
    this.content = content;
    this.deadline = deadline;
    this.done = done;
    this.deleted = deleted;
    this.updateAt = updateAt;
  }

  deleteTask = (): any => {
    const task = new Task({
      id: this.id,
      taskKind: this.taskKind,
      content: this.content,
      deadline: this.deadline,
      done: this.done,
      deleted: this.deleted,
      updateAt: this.updateAt
    })
    return task;
  }
}