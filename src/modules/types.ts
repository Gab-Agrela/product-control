export interface RegisterArgs {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginUserArgs {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  message: string;
  token: string;
}
