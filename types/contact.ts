export interface IContactUsPayload {
  fullName: string;
  email: string;
  message: string;
}

export interface IContactUsResponse {
  success: boolean;
  message: string;
}
