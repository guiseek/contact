import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { CheckUserResponse } from '@contact/type';
import { AuthService } from './auth.service';

export abstract class CheckUserValidator {
  abstract service: AuthService;

  protected error = new BehaviorSubject<CheckUserResponse>({
    exists: false,
    message: '',
  });

  checkUser(username: string) {
    return this.service.checkUser({ username }).pipe(
      distinctUntilChanged(),
      map(({ exists, message }) => {
        this.error.next({ exists, message });
        return exists ? { exists } : null;
      })
    );
  }
}
