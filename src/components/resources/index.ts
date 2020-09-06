import axios from "axios";
import { AddressResponseType, AddressType } from "./types";

const instance = axios.create({
  baseURL: "/api",
  timeout: 1000,
});

export type GetAddressesParams = {
  page: number;
  per: number;
};

export const getAddresses = async (params: GetAddressesParams) => {
  const response = await instance.get<AddressResponseType>("/addresses.json", {
    params,
  });
  return await response.data;
};

export const getAddress = async (id: number) => {
  const response = await instance.get<AddressType>(`/addresses/${id}.json`);
  return await response.data;
};

export const createAddress = async (data: AddressType) => {
  const response = await instance.post<AddressType>("/addresses.json", {
    data,
  });
  return await response.data;
};

export const updateAddress = async (data: AddressType) => {
  const response = await instance.put<AddressType>(
    `/addresses/${data.id}.json`,
    { data }
  );
  return await response.data;
};

export const deleteAddress = async (id: number) => {
  const response = await instance.delete(`/addresses/${id}.json`);
  return await response.data;
};
