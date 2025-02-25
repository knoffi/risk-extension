import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { MonitoringModule } from './support/monitoring/monitoring.module';
import { GameRoomModule } from './core/game-room/game-room.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    
    }),
    MonitoringModule,
    GameRoomModule
  ],
  controllers: [AppController],
})
export class AppModule {}
