import { TelegramConfigService } from './TelegramConfigService';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  providers: [TelegramConfigService],
  exports: [TelegramConfigService],
})
export class ConfigurationModule extends ConfigModule {}
