import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth(): string {
    return 'This will return the auth';
  }
}
