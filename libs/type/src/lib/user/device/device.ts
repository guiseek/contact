import { User } from '../user';

export interface Device {
  kind: string;
  deviceId: string;
  groupId: string;
  label: string;
  user: User;
  id: number;
}
