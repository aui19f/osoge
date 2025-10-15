import { typeUsers } from "@/app/actions/getUser";

export interface LoginResponse {
  status: number;
  message: string;
  data?: typeUsers;
}
