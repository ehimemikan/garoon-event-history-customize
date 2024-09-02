type Users = {
  users: User[];
  hasNext: boolean;
};

type User = {
  id: string;
  name: string;
  code: string;
};
