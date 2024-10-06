export type AuthLoginPayload = {
  email: string;
  password: string;
};

export type AuthRegisterPayload = AuthLoginPayload;

export type AuthLoginResponsePayload = {
  token_type: string;
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
};
