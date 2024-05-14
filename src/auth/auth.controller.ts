import { Body, Controller, HttpStatus, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async login(@Body() logIn: LoginUserDto): Promise<any> {
    try {
      return await this.authService.login(logIn);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message
        }, error.stack)
      }
      throw error;

    }
  }
}
