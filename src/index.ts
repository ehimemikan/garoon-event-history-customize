// Garoonの予定変更の履歴を表示するカスタマイズ
// 仕組みとしては、datastoreに差分を管理するデータを保存していって、表示するときに差分を見やすく表示する
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
const DATASTORE_KEY: string = "garoon.event.history.customize";

interface DataStoreObject {
  histories: HistoryData[]
}

interface HistoryData {
  updater: string, //名前だけで良い
  subject: string,
  start: string, //datetimeがあれば良い
  end: string,
  attendies: string[], //名前の配列 後で所属を消す処理を書く
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
  ボタンを消してinsertTableRowに差分を表示する(el);
}

async function 予定内容をdatastoreへ保存する(event: ScheduleEvent): Promise<void> {
  const histories: HistoryData[] = await これまでの予定の内容をdatastoreから取得する();
  const isPOST = (histories.length == 0);
  const newHistory = ScheduleEventからHistoryDataを作る(event);
  
  // historiesの最初にnewHistoryを追加し、4つ以上なら最後の履歴は捨てる
  histories.unshift(newHistory);
  if (histories.length > 4) {
    histories.pop();
  }
  const eventId: number = Number(event.id);

  // REST APIでdatastoreに保存
  if(isPOST){ 
    await garoon.api(`/api/v1/schedule/events/${eventId}/datastore/${DATASTORE_KEY}`, 'POST', {value: {histories: histories}});
  }else{
    await garoon.api(`/api/v1/schedule/events/${eventId}/datastore/${DATASTORE_KEY}`, 'PUT', {value: {histories: histories}});
  }
}

function 取得用のボタンをinsertTableRowで表示する() {
  // Reactで書きたかった
  // ボタンを押したときの内容を実行するボタンを作成。
  const button = document.createElement("button");
  button.textContent = "履歴を表示";
  button.addEventListener("click", ボタンを押した時の内容);

  garoon.schedule.event.insertTableRow("履歴を表示", button);
}

function datastoreの内容を呼び出しJSONの差分を計算する(before: HistoryData, after:HistoryData) {
  return diff(before, after);
}

async function ボタンを消してinsertTableRowに差分を表示する(element: HTMLButtonElement): Promise<void> {
  const histories = await これまでの予定の内容をdatastoreから取得する();
  const diffTest = datastoreの内容を呼び出しJSONの差分を計算する(histories[0], histories[1]);
  console.log(diffTest);
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
  let value: Object  = {};
  const data = await garoon.schedule.event.datastore.get(DATASTORE_KEY);
  if ( data != undefined) {value = data.value;}

  // valueが履歴の配列じゃなかったら空の配列を作って返す
  return isDataStoreObject(value) && Array.isArray(value.histories) ? value.histories : [];
}

function isDataStoreObject(obj: unknown): obj is DataStoreObject {
  return typeof obj === 'object' && obj !== null && 'histories' in obj;
}
