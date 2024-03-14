export interface IJwtToken {
  sub: string;
  token_use: string;
  scope: string;
  iss: string;
  exp: string;
  iat: string;
  jti: string;
  client_id: string;
  username: string;
}
