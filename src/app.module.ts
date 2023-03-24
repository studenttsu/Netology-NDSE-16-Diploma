import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    HotelsModule,
    ReservationsModule,
    SupportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
