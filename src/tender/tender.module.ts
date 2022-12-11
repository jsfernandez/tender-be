import { Module } from '@nestjs/common';
import { TenderService } from './tender.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports:[HttpModule],
  providers: [TenderService]
})
export class TenderModule {}
