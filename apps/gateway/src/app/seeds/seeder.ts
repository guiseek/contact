import {Injectable, Logger} from '@nestjs/common'
import {UserSeederService} from './user-seeder.service'

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService
  ) {}

  async seed() {
    await this.users()
      .then((completed) => {
        this.logger.log('Successfuly completed seeding users...')
        Promise.resolve(completed)
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...')
        Promise.reject(error)
      })
  }
  async users() {
    return await Promise.all(this.userSeederService.create())
      .then((createdUsers) => {
        const removedNullsUsers = createdUsers.filter((nullValueOrCreatedUser) => nullValueOrCreatedUser)
        this.logger.verbose(`No. of users created: ${removedNullsUsers.length} `)
        return Promise.resolve(true)
      })
      .catch((error) => Promise.reject(error))
  }
}
