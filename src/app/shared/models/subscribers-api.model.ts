import {ApiCountriesModel} from "./api-countries.model";

export interface SubscribersApiModel {
  Area: string;
  SearchCountry?: ApiCountriesModel
  CountryCode: string;
  CountryName: string;
  Name: string;
  Email: string;
  JobTitle: string;
  PhoneNumber: string;
  PhoneCode: string;
  Topics: any[];
  Id: number;
}
