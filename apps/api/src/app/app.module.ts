import { AuthModule } from '@lit/auth';
import { SecretModule } from '@lit/secret';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    SecretModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
