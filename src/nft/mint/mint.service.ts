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

  private async totalSupply() {
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

    const _returnValue = await this.contract.methods.totalSupply().call();
    return _returnValue;
  }

  async CreateIpfsCid(file: Express.Multer.File, mintNft: MintNftDto) {
    const _tokenId = Number(await this.totalSupply()) + 1;
    const _client = new Web3Storage({
      token: process.env.WEB3_STORAGE_TOKEN,
    });
    const _file = new File([file.buffer], String(_tokenId), {
      type: file.mimetype,
    });
    const _cid = await _client.put([_file]);

    const _metaData = {
      name: mintNft.name,
      description: mintNft.description ? mintNft.description : null,
      image: `ipfs://${_cid}/${_tokenId}`,
      decimals: 1,
      properties: {
        type: file.mimetype,
        external_url: mintNft.external_url ? mintNft.external_url : null,
      },
    };
    const _buffer = Buffer.from(JSON.stringify(_metaData));
    // eslint-disable-next-line prettier/prettier
    const _metaDataCid = await _client.put([new File([_buffer], `${_tokenId}.json`)]);
    return {
      metadata_uri: `ipfs://${_metaDataCid}/${_tokenId}.json`,
    };
  }
}
