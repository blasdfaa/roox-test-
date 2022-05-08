import axios from "axios";
import { type User, type UserApiResponse } from "../interfaces/user.interface";
import { HttpCode } from "../utils/constants";

type onSuccessCallback<T> = (data: T) => void;
type onErrorCallback = () => void;

const API_URL = "https://jsonplaceholder.typicode.com";

const serializeUserData = (user: UserApiResponse): User => ({
  id: user.id,
  city: user.address.city,
  company: user.company.name,
  email: user.email,
  name: user.name,
  phone: user.phone,
  street: user.address.street,
  username: user.username,
  website: user.website,
  zipcode: user.address.zipcode,
});

const getAll = async (
  onSuccess?: onSuccessCallback<User[]>,
  onError?: onErrorCallback
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  try {
    const { data, status } = await axios.get<UserApiResponse[]>(
      `${API_URL}/users`
    );

    if (onSuccess && status === HttpCode.SUCCESS) {
      onSuccess(data.map((item) => serializeUserData(item)));
    }
  } catch (error) {
    console.log("error: ", error);
    return onError && onError();
  }
};

const getById = async (
  id: string,
  onSuccess?: onSuccessCallback<User>,
  onError?: onErrorCallback
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  try {
    const { data, status } = await axios.get<UserApiResponse>(
      `${API_URL}/users/${id}`
    );

    if (onSuccess && status === HttpCode.SUCCESS) {
      onSuccess(serializeUserData(data));
    }
  } catch (error) {
    console.log("error: ", error);
    return onError && onError();
  }
};

export default {
  getAll,
  getById,
};
