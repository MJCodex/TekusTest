export interface ApiCountriesModel {
  name: Name;
  cca3: string;
  capital: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  [key: string]: NativeNameObj;
}

export interface NativeNameObj {
  official: string;
  common: string;
}
