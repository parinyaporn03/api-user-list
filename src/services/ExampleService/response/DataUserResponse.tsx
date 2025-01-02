import { TypeResponse } from "../../TypeResponse";

export type DataUserResponse = TypeResponse<DataUserType>;

export type DataUserType = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: DataUser[];
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
