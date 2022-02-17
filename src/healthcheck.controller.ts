// Libraries
import { Controller, Get } from '@nestjs/common';

// swagger Use
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  healthcheck() {
    return { status: 200, success: true };
  }
}
