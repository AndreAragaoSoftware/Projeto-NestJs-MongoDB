import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventModule } from './event/event.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Garante que o ConfigModule seja global e carregue primeiro
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Garante que ConfigModule carregue antes
      inject: [ConfigService], // Injeta ConfigService para acessar as variáveis do .env
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Obtém MONGO_URI do .env
      }),
    }),
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
