type ScheduleEvent = {
  id: string;
  creator: User;
  createdAt: string;
  updater: User;
  updatedAt: string;
  eventType: "REGULAR" | "REPEATING" | "ALL_DAY";
  eventMenu: string;
  subject: string;
  notes: string;
  isAllDay: boolean;
  isStartOnly: boolean;
  attendees: Attendee[];
  attendeesCandidate: Entity[];
  watchers: Entity[];
  watchersCandidate: Entity[];
  companyInfo: CompanyInfo;
  attachments: ScheduleAttachment[];
  start: DateTime;
  end: DateTime;
  originalStartTimeZone: string;
  originalEndTimeZone: string;
  facilities: Facility[];
  facilitiesCandidate: Facility[];
  facilityUsingPurpose: string;
  facilityReservationInfo: FacilityReservationInfo;
  facilityUsageRequests: FacilityUsageRequest[];
  useAttendanceCheck: boolean;
  repeatInfo?: RepeatInfo;
};

type PrivateScheduleRestEvent = {
  id: "0";
  subject: "予定あり" | "Private appointment" | "已有安排";
  eventType: "REGULAR" | "REPEATING";
  originalStartTimeZone: string;
  originalEndTimeZone: string;
  isAllDay: boolean;
  isStartOnly: boolean;
  attendees?: Attendee[];
  facilities?: Facility[];
  visibilityType: "PRIVATE";
};

type ALLScheduleEvent = ScheduleEvent | PrivateScheduleRestEvent;

type RepeatInfo = {
  range: {
    type: "THIS_EVENT_ONLY" | "ON_AND_AFTER_THIS_EVENT" | "ALL_EVENT";
    date: string;
  };
  type:
    | "EVERY_DAY"
    | "EVERY_WEEKDAY"
    | "EVERY_WEEK"
    | "EVERY_1STWEEK"
    | "EVERY_2NDWEEK"
    | "EVERY_3RDWEEK"
    | "EVERY_4THWEEK"
    | "EVERY_LASTWEEK"
    | "EVERY_MONTH";
  period: Period;
  time: Period;
  timeZone: string;
  isAllDay: boolean;
  isStartOnly: boolean;
  dayOfWeek: string;
  dayOfMonth: string;
  exclusiveDateTimes: Period[];
  temporaryEventCandidates: Array<{
    start: DateTime;
    end: DateTime;
    facility: Facility;
  }>;
};

type Period = {
  start: string;
  end: string;
};

type DateTime = {
  dateTime: string;
  timeZone: string;
};

type ScheduleAttachment = {
  id: string;
  name: string;
  contentType: string;
  size: string;
};

type CompanyInfo = {
  name: string;
  zipCode: string;
  address: string;
  route: string;
  routeTime: string;
  routeFare: string;
  phone: string;
};

type Attendee = {
  id: string;
  name: string;
  type: string;
  code: string;
  attendanceResponse: {
    status: string;
    comment: string;
  };
};
type Entity = {
  id: string;
  name: string;
  type: string;
  code: string;
};

type Facility = {
  id: string;
  code: string;
  name: string;
};

type FacilityReservationInfo = {
  [itemCode: string]: {
    type: "SINGLE_LINE_TEXT" | "MULTI_LINE_TEXT" | "DROP_DOWN";
    value: string;
  };
};

type FacilityUsageRequest = {
  approvedBy: User[];
  facility: Facility;
  status: "IN_PROGRESS" | "REJECTED" | "APPROVED";
  approvedDateTime: string;
};

type ScheduleDataStoreItemValue = {
  value: {
    [key: string]: any;
  };
};

type AvailableTimes = {
  availableTimes: AvailableTime[];
};

type AvailableTime = {
  start: DateTime;
  end: DateTime;
  facility: Facility;
};

type FacilitiesGetByQuery = {
  facilities: FacilityGetByQuery[];
  hasNext: boolean;
};

type FacilityGetByQuery = Facility & {
  notes: string;
  facilityGroup: `${number}`;
};

type FacilitiesGetByAdministrator = {
  facilities: FacilityGetByAdministrator[];
  hasNext: boolean;
  count: number;
};

type FacilityGetByAdministrator = {
  id: number;
  name: string;
  nameLocale: {
    [key: string]: string;
  };
  code: string;
  notes: string;
  facilityGroup: number[];
};

type FacilityPostByAdministrator = FacilityGetByAdministrator;

type FacilityPatchByAdministrator = FacilityPostByAdministrator;

type FacilityGroupsGetByQuery = {
  facilityGroups: FacilityGroups[];
  hasNext: boolean;
};

type FacilityGroups = {
  id: number;
  name: string;
  code: string;
  notes: number;
  parentFacilityGroup: number;
  childFacilityGroups: Array<{ id: `${number}` }>;
};

type FacilityGroupsGetByAdministrator = {
  facilityGroups: Array<
    FacilityGroups & {
      nameLocale: {
        [key: string]: string;
      };
    }
  >;
  hasNext: boolean;
};

type FacilityGroupsPostByAdministrator = Omit<
  FacilityGroups,
  "childFacilityGroups"
> & {
  nameLocale: {
    [key: string]: string;
  };
};

type FacilityGroupsPatchByAdministrator = FacilityGroupsPostByAdministrator;

type ScheduleRestRequestBody = {
  eventType: "REGULAR" | "ALL_DAY";
  eventMenu?: string;
  subject?: string;
  notes?: string;
  start: DateTime;
  end?: DateTime;
  isAllDay?: boolean;
  isStartOnly?: boolean;
  attendees?: Array<Omit<Attendee, "attendanceResponse" | "id">>;
  facilities?: Array<Omit<Facility, "name">>;
  facilityUsingPurpose?: string;
  companyInfo?: CompanyInfo;
  attachments?: Array<{
    name: ScheduleAttachment["name"];
    // base64
    content: string;
  }>;
  watchers?: Array<
    | {
        id: string;
        type: "ORGANIZATION" | "USER" | "ROLE";
        name?: string;
      }
    | {
        code: string;
        type: "ORGANIZATION" | "USER" | "ROLE";
        name?: string;
      }
  >;
};

type FacilityGroupRestRequestBody = {
  name: string;
  nameLocale?: {
    [key: string]: string;
  };
  code: string;
  notes?: string;
  parentFacility?: string;
};

type BaseScheduleEventObject = {
  event: ScheduleEvent;
  type: string;
};

type ScheduleEventCreateShow = BaseScheduleEventObject & {
  reuse: boolean;
};

type ScheduleEventCreateSubmit = BaseScheduleEventObject & {
  error?: string;
};

type ScheduleEventCreateSuccess = BaseScheduleEventObject & {
  url?: string;
};

type ScheduleEventQuickCreateSubmitSuccess = BaseScheduleEventObject & {
  url?: string;
};

type ScheduleEventEditShow = BaseScheduleEventObject;

type ScheduleEventEditSubmit = BaseScheduleEventObject & {
  error?: string;
};

type ScheduleEventEditSubmitSuccess = BaseScheduleEventObject & {
  url?: string;
};

type ScheduleEventQuickEditSubmitSuccess = BaseScheduleEventObject & {
  url?: string;
};

type ScheduleEventDeleteSubmit = BaseScheduleEventObject & {
  error?: string;
  deleteFrom: "MINE" | "ALL_ATTENDEES";
  range: "THIS_ONLY" | "ON_AND_AFTER" | "ALL";
};

type ScheduleEventDeleteSubmitSuccess = BaseScheduleEventObject & {
  url?: string;
  deleteFrom: "MINE" | "ALL_ATTENDEES";
  range: "THIS_ONLY" | "ON_AND_AFTER" | "ALL";
};

type ScheduleEventDetailShow = BaseScheduleEventObject;

type ScheduleCalendarGroupDayIndexShow = {
  type: string;
  viewType: "GROUP_DAY";
  dates: string[];
};

type ScheduleCalendarGroupWeekIndexShow = {
  type: string;
  viewType: "GROUP_WEEK";
  dates: string[];
};

type ScheduleCalendarDayIndexShow = {
  type: string;
  viewType: "DAY";
  dates: string[];
};

type ScheduleCalendarWeekIndexShow = {
  type: string;
  viewType: "WEEK";
  dates: string[];
};

type ScheduleCalendarMonthIndexShow = {
  type: string;
  viewType: "Month";
  dates: string[];
};

type ScheduleEventAttendSubmitSuccess = BaseScheduleEventObject & {
  url?: string;
  range: "THIS ONLY" | "ON_AND_AFTER" | "ALL";
  isNotify: boolean;
};

type ScheduleEventLeaveSubmitSuccess = BaseScheduleEventObject & {
  url?: string;
  range: "THIS ONLY" | "ON_AND_AFTER" | "ALL";
  isNotify: boolean;
};

type BaseScheduleRestRequestParameter = {
  limit: number;
  offset: number;
  fields: string;
  orderBy: string;
  rangeStart: string;
  rangeEnd: string;
  target: string;
  keyword: string;
  showPrivate: boolean;
};

type getScheduleRestRequestParameter =
  | Partial<BaseScheduleRestRequestParameter>
  | (Partial<BaseScheduleRestRequestParameter> & {
      keyword: string;
      excludeFromSearch: string;
    })
  | (Partial<BaseScheduleRestRequestParameter> & {
      target: string;
      targetType: string;
    })
  | (Partial<BaseScheduleRestRequestParameter> & {
      keyword: string;
      excludeFromSearch: string;
      target: string;
      targetType: string;
    });
