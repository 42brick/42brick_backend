import { Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import * as dotenv from 'dotenv';
import Web3 from 'web3';
import { NFTStorage, File } from 'nft.storage';

dotenv.config();

@Injectable()
export class MintService {
  private readonly web3 = new Web3(process.env.TEST_DEPLOYED_ADDRESS);
  //   private readonly brickContract = new web3.eth.Contract(
  //     DEPLOYED_ABI,
  //     process.env.DEPLOYED_ADDRESS,
  //   );

  async MinERC721Nft(file: Express.Multer.File, mintNft: MintNftDto) {
    const _client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });
    const _file = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    const _metaData = await _client.store({
      name: mintNft.name,
      description: mintNft.description ? mintNft.description : null,
      image: _file,
      decimals: 1,
      properties: {
        type: file.mimetype,
        external_url: mintNft.external_url ? mintNft.external_url : null,
      },
    });
    console.log(_metaData);
    console.log(_metaData.url);
  }

  TestFunc(file, mintNft: MintNftDto) {
    console.log(file);
    console.log(file.fieldname);
    console.log(file.originalname);
    console.log(file.mimetype);
    console.log(file.buffer);
    console.log(typeof file.buffer[0]);
    console.log(file.size);
    console.log(mintNft);
    console.log(mintNft.external_url);
    const testObj = {
      name: mintNft.name,
      description: mintNft.description,
      external_url: mintNft.external_url ? mintNft.external_url : null,
    };
    console.log(testObj);
  }
}
