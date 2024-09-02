type Proxy = {
  status: "ACTIVE" | "INACTIVE";
  proxyCode: string;
  method: HttpMethod;
  url: string;
  parameter: Array<{
    key: string;
    value: string;
  }>;
  header: Array<{
    key: string;
    value: string;
  }>;
  body: Array<{
    key: string;
    value: string;
  }>;
};
