export function interTypes(): string {
  return 'inter-types'
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
