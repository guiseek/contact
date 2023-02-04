import {Client} from './client'

export abstract class ClientService {
  abstract save(id: string, userId: number): Promise<Client>
  abstract findByUser(userId: number): Promise<Client>
  abstract removeByClient(id: string): Promise<Client>
}
