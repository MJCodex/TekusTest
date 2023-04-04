export interface SubscribersApiModel {
  SystemId: any
  Area: string
  PublicId: number
  CountryCode: string
  CountryName: string
  Name: string
  Email: string
  JobTitle: string
  PhoneNumber: string
  PhoneCode: string
  PhoneCodeAndNumber: string
  LastActivityUtc?: string
  LastActivity?: string
  SubscriptionDate?: string
  SubscriptionMethod: number
  SubscriptionState: number
  SubscriptionStateDescription: string
  Topics: any[]
  Activity: string
  ConnectionState: number
  Id: number
  Some?: any
}
