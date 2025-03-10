import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService, ReadEnvConfig } from 'src/supporting/config/config.service';

@Controller()
export class HealthCheckController {
  constructor(@Inject(ConfigService) private config: ReadEnvConfig) { }

  @Get("/health-check")
  getHealtcheck() {
    return { env: this.config.getEnvInfo() };
  }
}