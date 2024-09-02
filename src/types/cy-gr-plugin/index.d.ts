// Triple Slash Directives
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path='./objects/todo.d.ts' />
/// <reference path='./objects/schedule.d.ts' />
/// <reference path='./objects/workflow.d.ts' />
/// <reference path='./objects/user.d.ts' />
/// <reference path='./objects/mail.d.ts' />
/// <reference path='./objects/message.d.ts' />
/// <reference path='./objects/organization.d.ts' />
/// <reference path='./objects/presence.d.ts' />
/// <reference path='./objects/notification.d.ts' />
/// <reference path='./objects/proxy.d.ts' />
/// <reference path='./objects/plugin.d.ts' />
/// <reference path='./api/javascriptApiEvents.d.ts' />
/// <reference path='./api/restApiEvents.d.ts' />

declare const $PLUGIN_ID: string;

type ErrorObj = {
  error: {
    cause: string;
    errorCode: string;
    message: string;
  };
};

declare namespace garoon {
  namespace events {
    /**
     * set event handler
     * @param event The event type or array of event types, you would like to trigger.
     * @param handler The function is triggered when above events is happend.
     */
    function on<T extends EventNames>(
      event: T | T[],
      handler: (callbackEvent: JSEvent<T>) => JSReturnEvent<T>
    ): void;
  }
  namespace base {
    namespace user {
      function getLoginUser(): LoginUser;
      // TODO nullable check
      interface LoginUser {
        id: string;
        garoonId: string;
        code: string;
        name: string;
        email: string;
        url: string;
        phone: string;
        timezone: string;
        language: "ja" | "en" | "zh" | "zh-tw";
      }
    }
    namespace request {
      function getRequestToken(): string;
    }
  }

  namespace connect {
    namespace kintone {
      function getRequestToken(): garoon.Promise<string>;
    }
  }
  /**
   * execute API request for garoon. It is void.
   * @param pathOrUrl API Uri
   * @param method Http Method
   * @param params request body or request parameter
   * @param callback callback function. response event is infered.
   * @param errback err handler
   */
  function api<P extends Paths, M extends HttpMethod>(
    pathOrUrl: P,
    method: M,
    params: RestParamsType<P, M>,
    callback: (response: RestReturnType<P, M>) => any,
    errback: (response: string | any) => any
  ): Promise<void>;
  /**
   * excute API request for garoon. It returns "garooon.Promise".
   * @param pathOrUrl API Uri
   * @param method Http Method
   * @param params request body or request parameter
   */
  function api<P extends Paths, M extends HttpMethod>(
    pathOrUrl: P,
    method: M,
    params: RestParamsType<P, M>
  ): garoon.Promise<RestReturnType<P, M>>;
  class Promise<T> {
    constructor(
      callback: (
        resolve: (resolved: T) => any,
        reject: (rejected: any) => any
      ) => void
    );

    then(callback: (resolved: T) => any): Promise<any>;
    catch(callback: (rejected: ErrorObj) => any): Promise<any>;

    static resolve(resolved: any): Promise<any>;
    static reject(rejected: any): Promise<any>;
    static all(listOfPromise: Array<Promise<any>>): Promise<any>;
  }

  namespace schedule {
    namespace event {
      namespace datastore {
        function get<T = any>(customizeName: string): { value: T };
        function set<T = any>(customizeName: string, value: T): Promise<T>;
      }
      type ItemCode = "DATE_AND_TIME" | "ATTENDEES" | "NOTES";
      function get(): ScheduleEvent;
      function set(callbackEvent: ScheduleEvent): void;
      function getHeaderSpaceElement(): HTMLElement | null;
      // NEW: add plugin namespace
      function insertTableRow(
        label: string,
        description: string | HTMLElement,
        item_code?: ItemCode
      ): void;
    }
    namespace calendar {
      type ViewType = "GROUP_DAY" | "GROUP_WEEK" | "DAY" | "WEEK" | "MONTH";
      function getDayFirstSpaceElement(
        viewType: ViewType,
        date: string
      ): HTMLElement | null;
    }
  }

  namespace message {
    namespace body {
      interface Recipients {
        recipients: Recipient[];
      }
      interface Recipient {
        id?: string;
        type: "USER";
        code?: string;
        name?: string;
      }
      function set(recipients: Recipients): void;

      function getItemLastSpaceElement(
        fieldCode: "recipients"
      ): HTMLElement | null;
    }
  }

  namespace workflow {
    namespace request {
      function get(): ApproveRequest;
      function set(approveRequest: ApproveRequest): void;
      function getSpaceElement(code: string): HTMLElement | null;
    }
  }

  namespace mail {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    namespace mail {
      function getMailSubjectSpaceElement(): HTMLElement | null;
    }
  }
  // NEW: add plugin namespace
  namespace plugin {
    function getConfig<T = any>(pluginId: string): T;
    function setConfig<T = any>(config: T, callback?: () => void): void;
  }
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
