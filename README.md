# todo-cli
cli で使えるtodoアプリ。デイリータスクとやりきりのタスクを別で管理したい。


# データの構造

```tsx
type taskType = "daily" | "oneShot";

interface DataKouzou {
  taskType: taskType;
  content: string;
  deadline: Date;
  done: boolean;
}
```

# できること

- todoをoneShot と dailyTask、別々に一覧表示。
- todoを追加できる
- doneにできる
- oneShotは期限を設定できる
- 日付が変わったらdailyTaskはautoで done: false に切り替わる。

# 使用方法
```
$ todo // すべてのtodoを表示
```
