interface Exist<T = any> {
  isExist: boolean;
  isError?: boolean;
  error?: string;
  data?: T;
}

export default Exist;
