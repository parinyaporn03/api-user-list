import { TypeResponse } from "../../TypeResponse";

export type CreateUserResponse = TypeResponse<CreateUserType>;

type CreateUserType = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};
