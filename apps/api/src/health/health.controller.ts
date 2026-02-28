import { Controller, Get, Query } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('api/health')
export class HealthController {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Get()
  async getHealth(@Query('deep') deep?: string) {
    const response: any = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };

    if (deep === 'true') {
      try {
        await this.dataSource.query('SELECT 1');
        response.database = 'connected';
      } catch (error) {
        response.database = 'error';
        response.status = 'degraded';
      }
    }

    return response;
  }
}
