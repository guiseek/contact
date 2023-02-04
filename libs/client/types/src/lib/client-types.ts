export function clientTypes(): string {
  return 'client-types'
}

export interface ClientToServerEvents {
  hello: () => void;
}
