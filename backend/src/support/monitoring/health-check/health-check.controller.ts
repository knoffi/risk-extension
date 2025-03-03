import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService, ReadConfig, ReadEnvConfig } from 'src/support/config/config.service';

@Controller()
export class HealthCheckController {
  constructor(@Inject(ConfigService) private config: ReadEnvConfig) { }

  @Get("/health-check")
  getHealtcheck() {
    return { env: this.config.getEnvInfo()};
  }
}