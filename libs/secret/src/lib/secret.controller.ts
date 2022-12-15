import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecretService } from './secret.service';

@Controller('v1')
export class SecretController {
  constructor(private secretService: SecretService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('secret')
  async getAllUsers() {
    return await this.secretService.randomSecret();
  }
}
