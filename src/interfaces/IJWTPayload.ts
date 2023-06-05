import { TUserRole } from "@/types/random_types";

export default interface IJWTPayload {
  id: number,
  name: string,
  role: TUserRole,
  iat: number,
  exp: number
}