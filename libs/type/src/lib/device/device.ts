import { User } from "../user";

export interface Device {
  kind: MediaDeviceKind;
  deviceId: string;
  groupId: string;
  label: string;
  user: User;
  id: number;
}
