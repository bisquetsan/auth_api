export type AuthState = {
  user: string;
  token: string;
  email?: string;
};

export type AuthActions =
  | {
      type: "LOGIN";
      payload: { user: string; token: string };
    }
  | { type: "LOGOUT" };
