import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
} from '@casl/ability'

import {User} from '../../data/user/ports/user'
import {Injectable} from '@nestjs/common'
import {MeetingImpl} from '../../data/user/entities/meeting.impl'

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
type Subjects = InferSubjects<typeof MeetingImpl | typeof User> | 'all'

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const {can, cannot, build} = new AbilityBuilder(createMongoAbility)

    if (user.isAdmin) {
      can(Action.Manage, 'all') // read-write access to everything
    } else {
      can(Action.Read, 'all') // read-only access to everything
    }

    // can(Action.Update, MeetingImpl, { users.: user.id });
    // cannot(Action.Delete, MeetingImpl, { isFinished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
