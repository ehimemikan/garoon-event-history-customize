type Paths = `/api/v1/${ApiUri}`;

type ApiUri = RestEventsMap[keyof RestEventsMap]["apiUri"];
type RestEventkeys = RestEventsMap[keyof RestEventsMap];

type RestEventsMap = {
  getSchedule: {
    apiUri: `schedule/events/${number}`;
    method: "GET";
    returnType: {
      data: ScheduleEvent;
    };
    paramsType: { [key: string]: never };
  };
  getSchedules: {
    apiUri: `schedule/events`;
    method: "GET";
    returnType: {
      data: {
        events: ALLScheduleEvent[];
        hasNext: boolean;
      };
    };
    paramsType: getScheduleRestRequestParameter;
  };
  postSchedule: {
    apiUri: "schedule/events";
    method: "POST";
    returnType: {
      data: ScheduleEvent;
    };
    paramsType: ScheduleRestRequestBody;
  };
  patchSchedule: {
    apiUri: `schedule/events/${number}`;
    method: "PATCH";
    returnType: {
      data: ScheduleEvent;
    };
    paramsType: Omit<Partial<ScheduleRestRequestBody>, "eventType">;
  };
  deleteSchedule: {
    apiUri: `schedule/events/${number}`;
    method: "DELETE";
    returnType: never;
    paramsType: { [key: string]: never };
  };
  getScheduleDataStore: {
    apiUri: `schedule/events/${number}/datastore/${string}`;
    method: "GET";
    returnType: {
      data: ScheduleDataStoreItemValue;
    };
    paramsType: { [key: string]: never };
  };
  postScheduleDataStore: {
    apiUri: `schedule/events/${number}/datastore/${string}`;
    method: "POST";
    returnType: {
      data: ScheduleDataStoreItemValue;
    };
    paramsType: ScheduleDataStoreItemValue;
  };
  putScheduleDataStore: {
    apiUri: `schedule/events/${number}/datastore/${string}`;
    method: "PUT";
    returnType: {
      data: ScheduleDataStoreItemValue;
    };
    paramsType: ScheduleDataStoreItemValue;
  };
  deleteScheduleDataStore: {
    apiUri: `schedule/events/${number}/datastore/${string}`;
    method: "DELETE";
    returnType: never;
    paramsType: { [key: string]: never };
  };
  searchAvailableTimes: {
    apiUri: "schedule/searchAvailableTimes";
    method: "POST";
    returnType: {
      data: AvailableTimes;
    };
    paramsType: {
      timeRanges: Array<{
        start: string;
        end: string;
      }>;
      timeInterval: number;
      attendees?: Array<
        | Omit<Attendee, "attendanceResponse" | "name">
        | Omit<Attendee, "attendanceResponse" | "name" | "id">
        | Omit<Attendee, "attendanceResponse" | "name" | "code">
      >;
      facilities?: Array<
        | Omit<Facility, "name">
        | Omit<Facility, "name" | "id">
        | Omit<Facility, "name" | "code">
      >;
      facilitySearchCondition?: "AND" | "OR";
    };
  };
  getFacilitiesByQuery: {
    apiUri: "schedule/facilities";
    method: "GET";
    returnType: {
      data: FacilitiesGetByQuery;
    };
    paramsType: Partial<{
      limit: number;
      offset: number;
      name: string;
    }>;
  };
  getAllFacilitiesByAdministrator: {
    apiUri: "schedule/admin/facilities";
    method: "GET";
    returnType: {
      data: FacilitiesGetByAdministrator;
    };
    paramsType: Partial<{
      id: number[];
      name: string;
      nameLocaleJa: string;
      nameLocaleEn: string;
      nameLocaleZh: string;
      nameLocaleZhTw: string;
      codes: string[];
      notes: string;
      facilityGroup: number[];
      limit: number;
      offset: number;
    }>;
  };
  postFacilitiesByAdministrator: {
    apiUri: "schedule/admin/facilities";
    method: "POST";
    returnType: {
      data: FacilityPostByAdministrator;
    };
    paramsType: Omit<
      Partial<FacilityGetByAdministrator>,
      "id" | "facilityGroup"
    > & {
      name: string;
      code: string;
    };
  };
  patchFacilitiesByAdministrator: {
    apiUri: `schedule/admin/facilities/${number}`;
    method: "PATCH";
    returnType: {
      data: FacilityPatchByAdministrator;
    };
    paramsType: Omit<
      Partial<FacilityGetByAdministrator>,
      "id" | "facilityGroup"
    > & {
      name: string;
      code: string;
    };
  };
  deleteFacilitiesByAdministrator: {
    apiUri: `schedule/admin/facilities/${number}`;
    method: "DELETE";
    returnType: never;
    paramsType: { [key: string]: never };
  };
  getFacilityGroupsByQuery: {
    apiUri: "schedule/facilityGroups";
    method: "GET";
    returnType: {
      data: FacilityGroupsGetByQuery;
    };
    paramsType: Partial<{
      limit: number;
      offset: number;
    }>;
  };
  getFacilitiesBelongedToFacilityGroupsByQuery: {
    apiUri: `schedule/facilityGroups/${number}/facilities`;
    method: "GET";
    returnType: {
      data: {
        facilities: Array<{
          id: string;
          code: string;
          name: string;
          notes: string;
          facilityGroup: string;
        }>;
      };
    };
    paramsType: Partial<{
      limit: number;
      offset: number;
    }>;
  };
  getFacilityGroupsByAdministrator: {
    apiUri: "schedule/admin/facilityGroups";
    method: "GET";
    returnType: {
      data: FacilityGroupsGetByAdministrator;
    };
    paramsType: Partial<{
      id: number[];
      name: string;
      nameLocaleJa: string;
      nameLocaleEn: string;
      nameLocaleZh: string;
      nameLocaleZhTw: string;
      codes: string[];
      notes: string;
      parentFacilityGroups: number;
      childFacilityGroups: number[];
      top: number;
      limit: number;
      offset: number;
    }>;
  };
  postFacilityGroupsByAdministrator: {
    apiUri: "schedule/admin/facilityGroups";
    method: "POST";
    returnType: {
      data: FacilityGroupsPostByAdministrator;
    };
    paramsType: FacilityGroupRestRequestBody;
  };
  patchFacilityGroupsByAdministrator: {
    apiUri: "schedule/admin/facilityGroups";
    method: "PATCH";
    returnType: {
      data: FacilityGroupsPatchByAdministrator;
    };
    paramsType: FacilityGroupRestRequestBody;
  };
  deleteFacilityGroupsByAdministrator: {
    apiUri: "schedule/admin/facilityGroups";
    method: "DELETE";
    returnType: never;
    paramsType: { [key: string]: never };
  };
  getAllUsers: {
    apiUri: "base/users";
    method: "GET";
    returnType: {
      data: Users;
    };
    paramsType: Partial<{
      limit: number;
      offset: number;
      name: string;
    }>;
  };
  getAllOrganization: {
    apiUri: "base/organizations";
    method: "GET";
    returnType: {
      data: Organizations;
    };
    paramsType: Partial<{
      limit: number;
      offset: number;
      name: string;
    }>;
  };
  getPresencesByUserId: {
    apiUri: `presence/users/${number}`;
    method: "GET";
    returnType: {
      data: Presence;
    };
    paramsType: { [key: string]: never };
  };
  getPresencesByUserName: {
    apiUri: `presence/users/code/${string}`;
    method: "GET";
    returnType: {
      data: Presence;
    };
    paramsType: { [key: string]: never };
  };
  patchPresencesByUserId: {
    apiUri: `presence/users/${number}`;
    method: "PATCH";
    returnType: {
      data: Presence;
    };
    paramsType: {
      status: {
        code: string;
      };
      notes: string;
    };
  };
  patchPresencesByLoginName: {
    apiUri: `presence/users/code/${string}`;
    method: "PATCH";
    returnType: {
      data: Presence;
    };
    paramsType: {
      code: string;
    };
  };
  getNotification: {
    apiUri: "notification/items";
    method: "GET";
    returnType: {
      data: Notifications;
    };
    paramsType: Partial<{
      limit: number;
      offset: number;
      fields: string;
    }>;
  };
  postNotification: {
    apiUri: "notification/items";
    method: "POST";
    returnType: {
      data: NotificationItem;
    };
    paramsType: NotificationRestRequestBody;
  };
  getProxy: {
    apiUri: `system/api/admin/proxies/code/${string}`;
    method: "GET";
    returnType: {
      data: Proxy;
    };
    paramsType: { [key: string]: never };
  };
  postProxy: {
    apiUri: `system/api/admin/proxies`;
    method: "POST";
    returnType: {
      data: Proxy;
    };
    paramsType: Partial<Proxy> & {
      proxyCode: string;
      method: string;
      url: string;
    };
  };
  patchProxy: {
    apiUri: `system/api/admin/proxies/code/${string}`;
    method: "PATCH";
    returnType: {
      data: Proxy;
    };
    paramsType: Omit<Partial<Proxy>, "proxyCode">;
  };
  deleteProxy: {
    apiUri: `system/api/admin/proxies/code/${string}`;
    method: "DELETE";
    returnType: never;
    paramsType: { [key: string]: never };
  };
  getPluginConfig: {
    apiUri: `system/plugin/admin/settings/${string}`;
    method: "GET";
    returnType: {
      data: PluginConfig;
    };
    paramsType: { [key: string]: never };
  };
  getAllWorkflowRequests: {
    apiUri: "workflow/admin/requests";
    method: "GET";
    returnType: {
      data: WorkflowGetAllRequests;
    };
    paramsType: Partial<WorkflowRestRequestParameter>;
  };
  getTodoCategories: {
    apiUri: "todo/categories";
    method: "GET";
    returnType: {
      data: TodoCategories;
    };
    paramsType: Partial<TodoCategoryRestRequestParameter>;
  };
  getTodo: {
    apiUri: `todo/todos/${string}`;
    method: "GET";
    returnType: {
      data: Todo;
    };
    paramsType: TodoRestRequestParameter;
  };
  postTodo: {
    apiUri: "todo/todos";
    method: "POST";
    returnType: {
      data: Todo;
    };
    paramsType: TodoRestRequestBody;
  };
};

type RestReturnTypeBody<
  P extends Paths,
  M extends HttpMethod,
  K extends RestEventkeys,
> = K extends RestEventkeys
  ? P extends `/api/v1/${K["apiUri"]}`
    ? M extends K["method"]
      ? K["returnType"]
      : never
    : never
  : never;

type RestReturnType<P extends Paths, M extends HttpMethod> = RestReturnTypeBody<
  P,
  M,
  RestEventkeys
>;

type RestParamsTypeBody<
  P extends Paths,
  M extends HttpMethod,
  K extends RestEventkeys,
> = K extends RestEventkeys
  ? P extends `/api/v1/${K["apiUri"]}`
    ? M extends K["method"]
      ? K["paramsType"]
      : never
    : never
  : never;

type RestParamsType<P extends Paths, M extends HttpMethod> = RestParamsTypeBody<
  P,
  M,
  RestEventkeys
>;
