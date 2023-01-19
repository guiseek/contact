import {UserImpl} from '../data/user/entities/user.impl'
import {CreateUser, User} from '@contact/type'
import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'

export const users: CreateUser[] = [
  {
    username: 'guiseek',
    password: '$2b$10$G.Bq/yHHl7P/ihLC6wLI6OOzQf1XuwEPkIxg9ksgrIlPx1vmKZN/a',
    salt: '$2b$10$G.Bq/yHHl7P/ihLC6wLI6O',
    displayName: 'Guilherme',
    email: 'guiseek@email.com',
  },
]

@Injectable()
export class UserSeederService {
  constructor(private readonly users: Repository<UserImpl>) {}
  create(): Promise<User>[] {
    return users.map(async (user: User) => {
      return await this.users
        .findOne({where: {username: user.username}})
        .then(async (dbbUser) => {
          if (dbbUser) {
            return Promise.resolve(null)
          }
          return Promise.resolve(await this.users.save(user))
        })
        .catch((error) => Promise.reject(error))
    })
  }
}
