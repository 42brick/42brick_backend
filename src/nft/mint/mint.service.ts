import { Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import * as dotenv from 'dotenv';
import { NFTStorage, File } from 'nft.storage';
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

  async MinERC721Nft(file: Express.Multer.File, mintNft: MintNftDto) {
    this.initWeb3();
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
    const _result = await this.contract.methods.mintNFT(_metaData.url).send({
      from: '0x91c44006684a559F56dCF7bf0EF4ca18F42DE2AD',
      gas: '1000000',
    });
    console.log(_result);
  }

  async TestFunc(file, mintNft: MintNftDto) {
    // console.log(this.contractABI);
    // console.log(this.contract);
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.url));
    // console.log(this.contractABI);
    // const contract = new this.web3.eth.Contract(
    //   this.contractABI,
    //   process.env.TEST_DEPLOYED_ADDRESS,
    // );
    // console.log(contract);
    // const id = await contract.methods.totalSupply().call();
    // console.log(id);

    // console.log(file);
    // console.log(file.fieldname);
    // console.log(file.originalname);
    // console.log(file.mimetype);
    // console.log(file.buffer);
    // console.log(typeof file.buffer[0]);
    // console.log(file.size);
    // console.log(mintNft);
    // console.log(mintNft.external_url);
    // const testObj = {
    //   name: mintNft.name,
    //   description: mintNft.description,
    //   external_url: mintNft.external_url ? mintNft.external_url : null,
    // };
    // console.log(testObj);
  }
}
