interface AppResponse<T = any> {
  isError: boolean;
  message: string;
  code: number;
  data?: T;
}

export default AppResponse;
