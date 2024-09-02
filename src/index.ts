// Garoonの予定変更の履歴を表示するカスタマイズ
// 仕組みとしては、datastoreに差分を管理するデータを保存していって、表示するときに差分を見やすく表示する

const DATASTORE_KEY: string = "garoon.event.history.customize";

interface DataStoreObject {
  histories: HistoryData[]
}

interface HistoryData {
  updater: string, //名前だけで良い
  subject: string,
  start: string, //datetimeがあれば良い
  end: string,
  attendies: string[], //名前の配列
  facilities: string[], //名前の配列
  notes: string,
}

garoon.events.on([
  "schedule.event.create.submit.success",
  "schedule.event.quick.create.submit.success",
  "schedule.event.edit.submit.success",
  "schedule.event.quick.edit.submit.success"
], JSAPIで登録成功_簡易登録成功_変更成功_簡易変更成功イベントをフックする);

garoon.events.on("schedule.event.detail.show", JSAPIで予定の表示イベントをフックする);

function JSAPIで登録成功_簡易登録成功_変更成功_簡易変更成功イベントをフックする(event: BaseScheduleEventObject): BaseScheduleEventObject {
  予定内容をdatastoreへ保存する(event.event);
  return event;
}

function JSAPIで予定の表示イベントをフックする(event: BaseScheduleEventObject): BaseScheduleEventObject {  
  取得用のボタンをinsertTableRowで表示する();
  return event;
}

function ボタンを押した時の内容(event: MouseEvent): void {
  const el = event.target as HTMLButtonElement;
  datastoreの内容を呼び出しJSONの差分を計算する();
  ボタンを消してinsertTableRowに差分を表示する(el);
}

async function 予定内容をdatastoreへ保存する(event: ScheduleEvent): Promise<void> {
  const histories: HistoryData[] = await これまでの予定の内容をdatastoreから取得する();
  const newHistory = ScheduleEventからHistoryDataを作る(event);
  
  // historiesの最初にnewHistoryを追加し、4つ以上なら最後の履歴は捨てる
  histories.unshift(newHistory);
  if (histories.length > 4) {
    histories.pop();
  }

  await garoon.schedule.event.datastore.set(DATASTORE_KEY, {histories: histories});
}

function 取得用のボタンをinsertTableRowで表示する() {
  // Reactで書きたかった
  // ボタンを押したときの内容を実行するボタンを作成。
  const button = document.createElement("button");
  button.textContent = "履歴を表示";
  button.addEventListener("click", ボタンを押した時の内容);

  garoon.schedule.event.insertTableRow("履歴を表示", button);
}

function datastoreの内容を呼び出しJSONの差分を計算する() {
  // TBD
  // いったん生dataを出す
}

async function ボタンを消してinsertTableRowに差分を表示する(element: HTMLButtonElement): Promise<void> {
  const histories = await これまでの予定の内容をdatastoreから取得する();
  const parent = element.parentElement as HTMLElement;
  element.remove();
  parent.textContent = JSON.stringify(histories, null, 2);
}

function ScheduleEventからHistoryDataを作る(event: ScheduleEvent): HistoryData {
  return {
    updater: event.updater.name,
    subject: event.subject,
    start: event.start.dateTime,
    end: event.end.dateTime,
    attendies: event.attendees.map(a => a.name),
    facilities: event.facilities.map(f => f.name),
    notes: event.notes
  };

}

async function これまでの予定の内容をdatastoreから取得する(): Promise<HistoryData[]> {
  const data: unknown = await garoon.schedule.event.datastore.get(DATASTORE_KEY);
  // dataが配列じゃなかったら空の配列を作って返す
  return isDataStoreObject(data) && Array.isArray(data.histories) ? data.histories : [];
}

function isDataStoreObject(obj: unknown): obj is DataStoreObject {
  return typeof obj === 'object' && obj !== null && 'histories' in obj;
}
