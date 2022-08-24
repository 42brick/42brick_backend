import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nft/nft.module';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [NftModule],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
