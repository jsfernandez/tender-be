import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenderController } from './tender/tender.controller';
import { TenderModule } from './tender/tender.module';
import { ConfigModule } from '@nestjs/config';
import { TenderService } from './tender/tender.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, TenderModule],
  controllers: [AppController, TenderController],
  providers: [AppService, TenderService],
})
export class AppModule {}
