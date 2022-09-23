import { Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import * as dotenv from 'dotenv';
import { Web3Storage, File } from 'web3.storage';
import Web3 from 'web3';
import { readFileSync } from 'fs';

dotenv.config();

@Injectable()
export class MintService {
  private readonly url: 'http://127.0.0.1:8545';
  // private readonly network_id = 5777;

  private web3 = undefined;
  private web3Provider = undefined;
  private contract = undefined;
  // private chairPerson = undefined;
  // private currentAccount = undefined;

  private async initWeb3() {
    // 주입된 web3 instance가 있는지 확인
    if (typeof this.web3 !== 'undefined') {
      this.web3Provider = this.web3.currentProvider;
    } else {
      // 주입된 web3 instance가 없다면, TestRPC로 주입
      this.web3Provider = new Web3.providers.HttpProvider(this.url);
    }
    this.web3 = new Web3(this.web3Provider);
    const _contractABI = JSON.parse(
      readFileSync('contract/build/contracts/BrickTokenERC721.json').toString(),
    ).abi;
    this.contract = new this.web3.eth.Contract(
      _contractABI,
      process.env.TEST_DEPLOYED_ADDRESS,
    );
  }

  async MintERC721Nft(file: Express.Multer.File, mintNft: MintNftDto) {
    this.initWeb3();
    const _client = new Web3Storage({
      token: process.env.WEB3_STORAGE_TOKEN,
    });
    const _file = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    const _cid = await _client.put([_file], { name: 'hello file' });
    const _metaData = {
      name: mintNft.name,
      description: mintNft.description ? mintNft.description : null,
      image: 'ipfs://' + _cid + '/' + file.originalname,
      decimals: 1,
      properties: {
        type: file.mimetype,
        external_url: mintNft.external_url ? mintNft.external_url : null,
      },
    };
    const _buffer = Buffer.from(JSON.stringify(_metaData));
    const _metaDataCid = await _client.put([
      new File([_buffer], 'metadata.json'),
    ]);
    console.log(_metaDataCid);
    console.log('ipfs://' + _metaDataCid + '/metadata.json');

    const _result = await this.contract.methods
      .mintNFT('ipfs://' + _metaDataCid + '/metadata.json')
      .send({
        from: '0x91c44006684a559F56dCF7bf0EF4ca18F42DE2AD',
        gas: '1000000',
      });
    console.log(_result);
  }

  async MakeIpfsCid(file: Express.Multer.File, mintNft: MintNftDto) {
    const _client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
    const _file = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    const _cid = await _client.put([_file]);

    const _metaData = {
      name: mintNft.name,
      description: mintNft.description ? mintNft.description : null,
      image: 'https://ipfs.io/ipfs/' + _cid + '/' + file.originalname,
      decimals: 1,
      properties: {
        type: file.mimetype,
        external_url: mintNft.external_url ? mintNft.external_url : null,
      },
    };
    const _buffer = Buffer.from(JSON.stringify(_metaData));
    const _metaDataCid = await _client.put([
      new File([_buffer], 'metadata.json'),
    ]);
    console.log(_metaDataCid);
    return {
      url: 'https://ipfs.io/ipfs/' + _metaDataCid + 'metadata.json',
    };
  }
}
