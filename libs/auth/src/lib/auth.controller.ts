import { Body, Controller, Get, HttpStatus, Post, Response } from '@nestjs/common';
import { ISignin } from '../types/types';
import { AuthService } from './auth.service';

@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() params:ISignin, @Response() res) {
    const isValid = await this.authService.signin(params);
    // return isValid;
    if(isValid === true) {
      const accessToken = await this.authService.loginWithCredentials(params.address);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        access_token: accessToken,
        address: params.address
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid signature'
      });
    }
  }
}
