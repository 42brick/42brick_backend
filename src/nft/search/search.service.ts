import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import * as dotenv from 'dotenv';

dotenv.config();
Moralis.start({ apiKey: process.env.API_KEY });

@Injectable()
export class SearchService {
//   searchNFTs(keyword: string, symbol?: string, filter?: string): unknown {
//     if (symbol && filter)
//       return Moralis.EvmApi.token.searchNFTs({
//         chain: symbol,
//         q: keyword,
//         filter: filter,
//       });
//     else if (symbol)
//       return Moralis.EvmApi.token.searchNFTs({
//         chain: symbol,
//         q: keyword,
//         filter: 'global',
//       });
//     else if (filter)
//       return Moralis.EvmApi.token.searchNFTs({
//         chain: 'eth',
//         q: keyword,
//         filter: filter,
//       });

//     const ethNFTs = Moralis.EvmApi.token.searchNFTs({
//       chain: 'eth',
//       q: keyword,
//       filter: 'global',
//     });
//     const bscNFTs = Moralis.EvmApi.token.searchNFTs({
//       chain: 'bsc',
//       q: keyword,
//       filter: 'global',
//     });
//     const polygonNFTs = Moralis.EvmApi.token.searchNFTs({
//       chain: 'polygon',
//       q: keyword,
//       filter: 'global',
//     });
//     const fantomNFTs = Moralis.EvmApi.token.searchNFTs({
//       chain: 'fantom',
//       q: keyword,
//       filter: 'global',
//     });

//     return {
//       Ethereum: {
//         chain: 'Ethereum',
//         symbol: 'eth',
//         ...ethNFTs,
//       },
//       BSC: {
//         chain: 'Binance Smart Chain',
//         symbol: 'bsc',
//         ...bscNFTs,
//       },
//       Polygon: {
//         chain: 'Polygon',
//         symbol: 'polygon',
//         ...polygonNFTs,
//       },
//       Fantom: {
//         chain: 'Fantom',
//         symbol: 'fantom',
//         ...fantomNFTs,
//       },
//     };
//   }
}
