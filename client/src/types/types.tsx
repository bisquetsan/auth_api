export type AuthState = {
  user: { username: string; email?: string; id?: number | undefined } | null;
  token: string;
  email?: string;
} | null;

export type AuthActions =
  | {
      type: "LOGIN";
      payload: {
        user: {
          username: string;
          email?: string;
          id?: number | undefined;
        } | null;
        token: string;
      };
    }
  | { type: "LOGOUT" };

export type tasks = {
  title: string;
  id?: number;
  description?: string;
  datecompleted?: Date;
  created?: Date;
  important?: boolean;
};

export type TasksContextType = {
  getTasks: () => Promise<tasks[]>;
  createTask: (taskData: tasks) => Promise<tasks>;
  deleteTask: (id: number) => Promise<void>;
};
