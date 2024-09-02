type Organizations = {
  organaization: Organization[];
  hasNext: boolean;
};

type Organization = {
  id: number;
  name: string;
  code: string;
  parentOrganization: string;
  childOrganizations: Array<{ id: number }>;
};
