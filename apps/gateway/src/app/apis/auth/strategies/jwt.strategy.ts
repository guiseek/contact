import {Injectable} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {apisOptions} from '../../config/apis-options'
import {AuthPayload} from '@contact/shared/types'
import {AuthUserResponseDto} from '../../../data'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apisOptions.jwtSecret,
    })
  }

  async validate({sub, email, displayName, username, roles}: AuthPayload) {
    return new AuthUserResponseDto(sub, email, username, displayName, roles)
  }
}
