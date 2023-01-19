import { User } from '../user';

export interface CreateDevice {
  user: Partial<User>;
  kind: string;
  deviceId: string;
  groupId: string;
  label: string;
}
