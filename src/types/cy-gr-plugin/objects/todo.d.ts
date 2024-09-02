type TodoCategory = {
  id: string;
  name: string;
};

type TodoCategories = {
  categories: TodoCategory[];
  hasNext: boolean;
};

type Todo = {
  id: string;
  status: "Completed" | "Uncompleted";
  category: string;
  subject: string;
  hasDueDate: boolean;
  dueDate?: string;
  priority: TodoPriority;
  notes: string;
};

type TodoRestRequestBody = {
  category?: string;
  subject: string;
  dueDate?: string;
  priority?: TodoPriority;
  notes?: string;
};

type TodoRestRequestParameter = {
  id: string;
};

type TodoCategoryRestRequestParameter = {
  limit: number;
  offset: number;
};

type TodoPriority = "1" | "2" | "3";
