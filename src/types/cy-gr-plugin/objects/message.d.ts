type BaseMessageEventObject = {
  body: MessageBody;
  type: string;
};

type MessageBody = {
  draft: boolean;
  recipients: Recipients[];
};

type Recipients = {
  id: string;
  name: string;
  code: string;
  type: "User";
};

type MessageBodyCreateShow = BaseScheduleEventObject;

type MessageBodyChangeToShow = BaseScheduleEventObject;
