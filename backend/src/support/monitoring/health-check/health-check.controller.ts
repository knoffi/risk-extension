import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get("/health-check")
  getHealtcheck() {
    return true;
  }
}