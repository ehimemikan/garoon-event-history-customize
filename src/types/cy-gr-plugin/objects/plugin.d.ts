type PluginConfig = {
  isActive: boolean;
  appliedTo: Array<{
    id: string;
    name: string;
    code: object;
    type: "USER" | "ORGANIZATION" | "ROLE";
  }>;
};
