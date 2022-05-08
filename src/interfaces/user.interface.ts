export type UserApiResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type User = Pick<
  UserApiResponse,
  "id" | "name" | "email" | "username" | "phone" | "website"
> & {
  company: string;
  street: string;
  city: string;
  zipcode: string;
};

export type UsersSortModeOptions = "default" | "city" | "company";
