# todo-cli
cli で使えるtodoアプリ。デイリータスクとやりきりのタスクを別で管理したい。

# データの構造

```tsx
type taskType = "daily" | "oneShot";

interface DataKouzou {
  // createdAt とか deleted とかも追加する？ 
  taskType: taskType;
  content: string;
  deadline: Date;
  done: boolean;
}
```

# 表示形式
["id", "done", "taskType", "content", "deadline"];

# 機能
(優先順位高)
- todo を表示する
  - todoをoneShot と dailyTask、別々に一覧表示。
  - 表形式でみやすく表示
- todoを追加できる
  - 対話形式で入力していく
  - oneShotは期限を設定できる
- doneにできる
- taskは削除することができる(flagで管理する？)
- 日付が変わったらdailyTaskはautoで done: false に切り替わる。
(優先順位低)

# 使用方法
```
$ todo // すべてのtodoを表示
$ todo <content> // (content: string) todo を追加
$ todo <taskId> // (taskId: number) task の done を toggle
$ todo -d <taskId> // (taskId: number) task の done を toggle

```
# todo
- 表形式で表示する
  - done はチェックマーク✔︎
- 対話形式どうやってやるん
- コマンドによって処理を分岐させる方法 
- (deleted だけでいいかも)task のプロパティに createdAt, deleted を追加
