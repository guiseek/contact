import {ClientService} from '../ports/client.service'
import {Client} from '../ports/client'
import {Model} from 'mongoose'

export class ClientServiceImpl implements ClientService {
  constructor(private clientModel: Model<Client>) {}

  async save(id: string, userId: number): Promise<Client> {
    if (!(await this.findByUser(userId))) {
      return this.clientModel.create({id, userId, updatedAt: new Date()})
    }

    return this.clientModel.findOneAndUpdate({userId}, {id})
  }

  findByUser(userId: number): Promise<Client> {
    return this.clientModel.findOne({userId}).exec()
  }

  removeByClient(id: string): Promise<Client> {
    return this.clientModel.findOneAndRemove({id}).exec()
  }
}
