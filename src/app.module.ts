import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportModule } from './support/support.module';
import { RolesGuard } from './core/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            connectionFactory: (connection) => {
                connection.plugin(require('mongoose-autopopulate'));
                return connection;
            },
        }),
        AuthModule,
        UsersModule,
        HotelsModule,
        ReservationsModule,
        SupportModule,
        MinioClientModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
