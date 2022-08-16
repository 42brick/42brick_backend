import { Controller, Get, Param } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get()
  getNFTs(@Param('addr') addr: string) {
    return this.nftService.getNFTs(addr);
  }

  @Get('eth')
  getEthNFTs(@Param('addr') addr: string) {
    return this.nftService.getNFTs(addr, 'eth');
  }

  @Get('bsc')
  getBscNFTs(@Param('addr') addr: string) {
    return this.nftService.getNFTs(addr, 'bsc');
  }

  @Get('polygon')
  getPolygonNFTs(@Param('addr') addr: string) {
    return this.nftService.getNFTs(addr, 'polygon');
  }

  @Get('fantom')
  getFantomNFTs(@Param('addr') addr: string) {
    return this.nftService.getNFTs(addr, 'fantom');
  }
}
