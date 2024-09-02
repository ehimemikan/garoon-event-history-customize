type BaseWorkFlowEventObject = {
  type: string;
};

type WorkflowRequestCreateShow = BaseScheduleEventObject & {
  reuse: boolean;
  preview: boolean;
  draft: boolean;
  confirm: false;
  viewer: "APPLICANT" | "ADMIN";
  stepCode: string;
  request: {
    isUrgent: boolean;
    items: Items;
  };
};

type workflowRequestDetailShow = BaseScheduleEventObject & {
  reuse: false;
  preview: false;
  draft: boolean;
  confirm: boolean;
  viewer: "APPLICANT" | "APPROVER" | "PERSON_OF_ACKNOWLEDGEMENT" | "PUBLIC";
  stepCode: string;
  request: {
    isUrgent: boolean;
    items: Items;
    steps: Steps;
  };
};

type WorkflowRequestApproveShow = BaseWorkFlowEventObject & {
  viewer: "APPROVER";
  reuse: false;
  preview: false;
  draft: false;
  confirm: false;
  stepCode: string;
  request: ApproveRequest;
};

type WorkflowRequestPrintShow = BaseWorkFlowEventObject & {
  viewer:
    | "APPLICANT"
    | "APPROVER"
    | "ADMIN"
    | "PERSON_OF_ACKNOWLEDGEMENT"
    | "PUBLIC";
  reuse: false;
  preview: false;
  draft: false;
  confirm: false;
  stepCode: string;
  request: ApproveRequest;
};

type WorkflowRequestCreateSubmitSuccess = BaseWorkFlowEventObject & {
  viewer: "APPLICANT";
  reuse: false;
  preview: false;
  draft: false;
  confirm: false;
  stepCode: string;
  request: ApproveRequest;
  url?: string;
};

type WorkflowRequestApproveSubmitSuccess = BaseWorkFlowEventObject & {
  viewer: "APPROVER";
  stepCode: string;
  request: ApproveRequest;
};

type WorkflowRequestAcknowledgeSubmitSuccess = BaseWorkFlowEventObject & {
  viewer: "ACKNOWLEDGER";
  stepCode: string;
  request: ApproveRequest;
  url?: string;
};

type ApproveRequest = {
  id: string;
  status: Status;
  createdAt: string;
  processingStepCode: string;
  name: string;
  number: string;
  isUrgent: boolean;
  applicant: Applicant;
  items: Items;
  steps: Steps;
  availableOperations: AvailableOperations;
  folders: Folder[];
  form: {
    id: string;
    name?: string;
  };
};

type Folder = {
  id: string;
  type: "UNPROCESSED" | "SENT" | "RECEIVED" | "DRAFT" | "FINISH";
};

type AvailableOperations = {
  sentBackTargets: "$applicant" | string[];
  list: Array<
    | "SENT_BACK"
    | "APPROVE"
    | "REJECT"
    | "WITHDRAW"
    | "CANCEL"
    | "CONFIRM"
    | "ACKNOWLEDGE"
  >;
};
type StringValueItem = {
  name: string;
  type:
    | "SINGLE_LINE_TEXT"
    | "MULTI_LINE_TEXT"
    | "NUMBER"
    | "CALC"
    | "RADIO_BUTTON"
    | "DROP_DOWN"
    | "Date";
  value: string;
};

type BooleanValueItem = {
  name: string;
  type: "CHECK_BOX";
  value: boolean;
};

type FileItemValueItem = {
  name: string;
  type: "FILE";
  value: Array<{
    id: string;
    contentType: string;
    name: string;
    size: string;
  }>;
};

type DateTimeValueItem = {
  name: string;
  type: "DATETIME";
  value: {
    date: string;
    time: string;
  };
};

type RouteNaviValueItem = {
  name: string;
  type: "ROUTE_NAVI";
  value: {
    route: string;
    expense: string;
  };
};

type Steps = {
  [id: string]: {
    id: string;
    name: string;
    requirement: string;
    isApprovalStep: number;
    processors: Processor[];
  };
};

type Items = {
  [id: string]:
    | StringValueItem
    | BooleanValueItem
    | FileItemValueItem
    | DateTimeValueItem
    | RouteNaviValueItem;
};

type Applicant = {
  code: string;
  name: string;
  proxy: {
    code: string;
    name: string;
  };
};

type Processor = {
  code: string;
  name: string;
  result: string;
  operatedAt: string;
  comment: string;
  proxy: {
    code: string;
    name: string;
  };
};

type Status = {
  name: string;
  type: string;
};

type WorkflowGetAllRequests = {
  requests: Array<Omit<ApproveRequest, "availableOperations" | "folder">>;
  hasNext: boolean;
};

type WorkflowRestRequestParameter = {
  limit: number;
  offset: number;
  fields: string;
  orderBy: string;
  rangeStartApprovedAt: string;
  rangeEndApprovedAt: string;
  form: string;
  status: string;
};
