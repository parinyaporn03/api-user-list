import { TypeResponse } from "../../TypeResponse";

export type SingleUserResponse = TypeResponse<DataUserType>;

export type DataUserType = {
  data: DataUser;
  support: {
    url: string;
    text: string;
  };
};

type DataUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
