import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { SearchModule } from './search/search.module';
import { DataModule } from './data/data.module';
import { MintModule } from './mint/mint.module';

@Module({
  controllers: [NftController],
  providers: [NftService],
  imports: [SearchModule, DataModule, MintModule],
})
export class NftModule {}
