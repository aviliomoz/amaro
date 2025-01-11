export type Brand = {
  id: string;
  name: string;
};

export type Branch = {
  id: string;
  name: string;
};

export type User = {
  id: string,
  name: string,
  lastname: string,
  email: string
}

export type APIResponse<T> = {
  ok: boolean,
  error: string | null,
  data: T,
  message: string | undefined
}