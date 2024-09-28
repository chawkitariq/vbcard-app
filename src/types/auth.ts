export type AuthLoginPayload = {
  email: string;
  password: string;
};

export type AuthLoginResponsePayload = {
  jwt: string;
};
