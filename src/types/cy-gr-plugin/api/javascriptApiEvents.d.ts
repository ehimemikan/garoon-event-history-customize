type JsEventsList = {
  ScheduleEventCreateShow: {
    name: "schedule.event.create.show";
    type: ScheduleEventCreateShow;
    returnType: ScheduleEventCreateShow;
  };
  ScheduleEventCreateSubmit: {
    name: "schedule.event.create.submit";
    type: ScheduleEventCreateSubmit;
    returnType: ScheduleEventCreateSubmit | garoon.Promise<any>;
  };
  ScheduleEventCreateSuccess: {
    name: "schedule.event.create.submit.success";
    type: ScheduleEventCreateSuccess;
    returnType: ScheduleEventCreateSuccess;
  };
  ScheduleEventQuickCreateSubmitSuccess: {
    name: "schedule.event.quick.create.submit.success";
    type: ScheduleEventQuickCreateSubmitSuccess;
    returnType: ScheduleEventQuickCreateSubmitSuccess;
  };
  ScheduleEventEditShow: {
    name: "schedule.event.edit.show";
    type: ScheduleEventEditShow;
    returnType: ScheduleEventEditShow;
  };
  ScheduleEventEditSubmit: {
    name: "schedule.event.edit.submit";
    type: ScheduleEventEditSubmit;
    returnType: ScheduleEventEditSubmit | garoon.Promise<any>;
  };
  ScheduleEventEditSubmitSuccess: {
    name: "schedule.event.edit.submit.success";
    type: ScheduleEventEditSubmitSuccess;
    returnType: ScheduleEventEditSubmitSuccess;
  };
  ScheduleEventQuickEditSubmitSuccess: {
    name: "schedule.event.quick.edit.submit.success";
    type: ScheduleEventQuickEditSubmitSuccess;
    returnType: ScheduleEventQuickEditSubmitSuccess;
  };
  ScheduleEventDeleteSubmit: {
    name: "schedule.event.delete.submit";
    type: ScheduleEventDeleteSubmit;
    returnType: ScheduleEventDeleteSubmit;
  };
  ScheduleEventDeleteSubmitSuccess: {
    name: "schedule.event.delete.submit.success";
    type: ScheduleEventDeleteSubmitSuccess;
    returnType: ScheduleEventDeleteSubmitSuccess;
  };
  ScheduleEventDetailShow: {
    name: "schedule.event.detail.show";
    type: ScheduleEventDetailShow;
    returnType: ScheduleEventDetailShow;
  };
  ScheduleCalendarGroupDayIndexShow: {
    name: "schedule.calendar.groupDayIndex.show";
    type: ScheduleCalendarGroupDayIndexShow;
    returnType: ScheduleCalendarGroupDayIndexShow;
  };
  ScheduleCalendarGroupWeekIndexShow: {
    name: "schedule.calendar.groupWeekIndex.show";
    type: ScheduleCalendarGroupWeekIndexShow;
    returnType: ScheduleCalendarGroupWeekIndexShow;
  };
  ScheduleCalendarDayIndexShow: {
    name: "schedule.calendar.dayIndex.show";
    type: ScheduleCalendarDayIndexShow;
    returnType: ScheduleCalendarDayIndexShow;
  };
  ScheduleCalendarWeekIndexShow: {
    name: "schedule.calendar.weekIndex.show";
    type: ScheduleCalendarWeekIndexShow;
    returnType: ScheduleCalendarWeekIndexShow;
  };
  ScheduleCalendarMonthIndexShow: {
    name: "schedule.calendar.monthIndex.show";
    type: ScheduleCalendarMonthIndexShow;
    returnType: ScheduleCalendarMonthIndexShow;
  };
  ScheduleEventAttendSubmitSuccess: {
    name: "schedule.event.attend.submit.success";
    type: ScheduleEventAttendSubmitSuccess;
    returnType: ScheduleEventAttendSubmitSuccess;
  };
  ScheduleEventLeaveSubmitSuccess: {
    name: "schedule.event.leave.submit.success";
    type: ScheduleEventLeaveSubmitSuccess;
    returnType: ScheduleEventLeaveSubmitSuccess;
  };
  MessageBodyCreateShow: {
    name: "message.body.create.show";
    type: MessageBodyCreateShow;
    returnType: MessageBodyCreateShow;
  };
  MessageBodyChangeToShow: {
    name: "message.body.changeTo.show";
    type: MessageBodyChangeToShow;
    returnType: MessageBodyChangeToShow;
  };
  WorkflowRequestCreateShow: {
    name: "workflow.request.create.show";
    type: WorkflowRequestCreateShow;
    returnType: WorkflowRequestCreateShow;
  };
  workflowRequestDetailShow: {
    name: "workflow.request.detail.show";
    type: workflowRequestDetailShow;
    returnType: workflowRequestDetailShow;
  };
  WorkflowRequestApproveShow: {
    name: "workflow.request.approve.show";
    type: WorkflowRequestApproveShow;
    returnType: WorkflowRequestApproveShow;
  };
  WorkflowRequestPrintShow: {
    name: "workflow.request.print.show";
    type: WorkflowRequestPrintShow;
    returnType: WorkflowRequestPrintShow;
  };
  WorkflowRequestCreateSubmitSuccess: {
    name: "workflow.request.create.submit.success";
    type: WorkflowRequestCreateSubmitSuccess;
    returnType: WorkflowRequestCreateSubmitSuccess | garoon.Promise<any>;
  };
  WorkflowRequestApproveSubmitSuccess: {
    name: "workflow.request.approve.submit.success";
    type: WorkflowRequestApproveSubmitSuccess;
    returnType: WorkflowRequestApproveSubmitSuccess | garoon.Promise<any>;
  };
  WorkflowRequestAcknowledgeSubmitSuccess: {
    name: "workflow.request.acknowledge.submit.success";
    type: WorkflowRequestAcknowledgeSubmitSuccess;
    returnType: WorkflowRequestAcknowledgeSubmitSuccess | garoon.Promise<any>;
  };
  MailMailSendSubmit: {
    name: "mail.mail.send.submit";
    type: MailMailSendSubmit;
    returnType: MailMailSendSubmit | garoon.Promise<any> | boolean;
  };
  MailMailDetailShow: {
    name: "mail.mail.detail.show";
    type: MailMailDetailShow;
    returnType: MailMailDetailShow;
  };
};

type EventKeys = JsEventsList[keyof JsEventsList];
type EventNames = EventKeys["name"];

type JSEventBody<
  T extends EventNames,
  K extends EventKeys,
> = K extends EventKeys ? (T extends K["name"] ? K["type"] : never) : never;

type JSEvent<T extends EventNames> = JSEventBody<T, EventKeys>;

type JSReturnEventBody<
  T extends EventNames,
  K extends EventKeys,
> = K extends EventKeys
  ? T extends K["name"]
    ? K["returnType"]
    : never
  : never;

type JSReturnEvent<T extends EventNames> = JSReturnEventBody<T, EventKeys>;
