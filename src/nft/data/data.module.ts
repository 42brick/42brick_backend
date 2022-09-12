import { Module } from '@nestjs/common';
import { ValidService } from '../valid/valid.service';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  controllers: [DataController],
  providers: [DataService, ValidService],
  imports: [],
})
export class DataModule {}
