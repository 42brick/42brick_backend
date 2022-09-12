import { Module } from '@nestjs/common';
import { ValidService } from '../valid/valid.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, ValidService],
  imports: [],
})
export class SearchModule {}
