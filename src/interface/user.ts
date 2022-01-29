export default interface user {
  id?: number;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  password_digest?: string;
  token?: string;
}
