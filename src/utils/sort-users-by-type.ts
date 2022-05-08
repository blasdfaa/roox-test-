/* eslint-disable import/prefer-default-export */
import { User, UsersSortModeOptions } from "../interfaces/user.interface";

export const sortUsersByType = (users: User[], type: UsersSortModeOptions) => {
  const types = {
    default: () => users,
    city: () => [...users].sort((a, b) => (a.city > b.city ? 1 : -1)),
    company: () => [...users].sort((a, b) => (a.company > b.company ? 1 : -1)),
  };

  return types[type]();
};
