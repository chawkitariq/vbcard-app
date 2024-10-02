export type AuthLoginPayload = {
  email: string;
  password: string;
};

export type AuthRegisterPayload = AuthLoginPayload;

export type AuthLoginResponsePayload = {
  jwt: string;
};
