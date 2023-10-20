import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: User) {
    const { email, name, password } = createUserDto;
    return this.authService.signUp(email, password, name);
  }
  @Post('login')
  signIn(@Body() signInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
