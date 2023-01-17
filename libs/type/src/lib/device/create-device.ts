export interface CreateDevice {
  kind: MediaDeviceKind;
  deviceId: string;
  groupId: string;
  label: string;
  userId: number;
}
