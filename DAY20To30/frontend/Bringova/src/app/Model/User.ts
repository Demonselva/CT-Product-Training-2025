export interface User {
  user_id: number;
  username: string;
  email: string;
  mobile_number: string;
  gender: string;
  dob: string;
  password: string | null;
  user_added_date: string;
}
