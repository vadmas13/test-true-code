import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { IsUnique, TimeoutInterceptor } from '@share';

import { ProductModule } from './product/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ProductModule,
        CacheModule.register({ isGlobal: true, ttl: 0 }),
    ],
    controllers: [],
    providers: [
        IsUnique,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
    ],
})
export class AppModule {}
