export type AddressType = {
  id: number;
  name: string;
  name_kana: string;
  gender: string;
  phone: string;
  mail: string;
  zipcode: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  age: number;
};

export type AddressResponseType = {
  total: number;
  per: number;
  page: number;
  results: AddressType[];
};
