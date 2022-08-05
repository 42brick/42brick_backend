require('dotenv').config();

const express = require('express');
const Moralis = require('moralis/node');

const router = express.Router();

/**
 * @openapi
 * /search-nfts:
 *   get:
 *     tags: [Get NFTs]
 *     description: search NFTs using keyword
 *     parameters:
 *       - name: keyword
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         examples:
 *           Sample:
 *            value: "bear"
 *            summary: example keyword
 *     responses:
 *       200:
 *         description: Returns NFTs searched by keyword.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Ethereum:
 *                   type: object
 *                   description: "NFTs in Ethereum"
 *                   properties:
 *                     chain:
 *                       type: string
 *                     symbol:
 *                       type: string
 *                     result:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *                         cursor:
 *                           type: integer
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: object
 *                             properties:
 *                               token_id:
 *                                 type: string
 *                               token_address:
 *                                 type: string
 *                               token_uri:
 *                                 type: string
 *                               metadata:
 *                                 type: string
 *                               contract_type:
 *                                 type: string
 *                               token_hash:
 *                                 type: string
 *                               minter_address:
 *                                 type: string
 *                               block_number_minted:
 *                                 type: string
 *                               transaction_minted:
 *                                 type: string
 *                               last_token_uri_sync:
 *                                 type: string
 *                               last_metadata_sync:
 *                                 type: string
 *                               created_at:
 *                                 type: string
 *                           maxItems: 1
 *                 BSC:
 *                   type: object
 *                   description: "NFTs in Binance Smart Chain"
 *                   properties:
 *                     chain:
 *                       type: string
 *                     symbol:
 *                       type: string
 *                     result:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *                         cursor:
 *                           type: integer
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: object
 *                             properties:
 *                               token_id:
 *                                 type: string
 *                               token_address:
 *                                 type: string
 *                               token_uri:
 *                                 type: string
 *                               metadata:
 *                                 type: string
 *                               contract_type:
 *                                 type: string
 *                               token_hash:
 *                                 type: string
 *                               minter_address:
 *                                 type: string
 *                               block_number_minted:
 *                                 type: string
 *                               transaction_minted:
 *                                 type: string
 *                               last_token_uri_sync:
 *                                 type: string
 *                               last_metadata_sync:
 *                                 type: string
 *                               created_at:
 *                                 type: string
 *                           maxItems: 1
 *                 Ploygon:
 *                   type: object
 *                   description: "NFTs in Ploygon"
 *                   properties:
 *                     chain:
 *                       type: string
 *                     symbol:
 *                       type: string
 *                     result:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *                         cursor:
 *                           type: integer
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: object
 *                             properties:
 *                               token_id:
 *                                 type: string
 *                               token_address:
 *                                 type: string
 *                               token_uri:
 *                                 type: string
 *                               metadata:
 *                                 type: string
 *                               contract_type:
 *                                 type: string
 *                               token_hash:
 *                                 type: string
 *                               minter_address:
 *                                 type: string
 *                               block_number_minted:
 *                                 type: string
 *                               transaction_minted:
 *                                 type: string
 *                               last_token_uri_sync:
 *                                 type: string
 *                               last_metadata_sync:
 *                                 type: string
 *                               created_at:
 *                                 type: string
 *                           maxItems: 1
 *                 Fantom:
 *                   type: object
 *                   description: "NFTs in Fantom"
 *                   properties:
 *                     chain:
 *                       type: string
 *                     symbol:
 *                       type: string
 *                     result:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *                         cursor:
 *                           type: integer
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: object
 *                             properties:
 *                               token_id:
 *                                 type: string
 *                               token_address:
 *                                 type: string
 *                               token_uri:
 *                                 type: string
 *                               metadata:
 *                                 type: string
 *                               contract_type:
 *                                 type: string
 *                               token_hash:
 *                                 type: string
 *                               minter_address:
 *                                 type: string
 *                               block_number_minted:
 *                                 type: string
 *                               transaction_minted:
 *                                 type: string
 *                               last_token_uri_sync:
 *                                 type: string
 *                               last_metadata_sync:
 *                                 type: string
 *                               created_at:
 *                                 type: string
 *                           maxItems: 1
 */
router.get('/', async (req, res, next) => {

    await Moralis.start({serverUrl: process.env.SERVER_URL, appId: process.env.APP_ID});
    const keyword = req.query.keyword;

    const options = [
        {q: keyword, chain: 'eth', filter: 'global'},
        {q: keyword, chain: 'bsc', filter: 'global'},
        {q: keyword, chain: 'matic', filter: 'global'},
        {q: keyword, chain: 'ftm', filter: 'global'},
    ];

    const ethNFTs = await Moralis.Web3API.token.searchNFTs(options[0]);
    const bscNFTs = await Moralis.Web3API.token.searchNFTs(options[1]);
    const ploygonNFTs = await Moralis.Web3API.token.searchNFTs(options[2]);
    const ftmNFTs = await Moralis.Web3API.token.searchNFTs(options[3]);

    const NFTs = {
        'Ethereum': {
            'chain': 'Ethereum',
            'symbol': 'eth',
            'result': ethNFTs
        },
        'BSC': {
            'chain': 'Binance Smart Chain',
            'symbol': 'bsc',
            'result': bscNFTs
        },
        'Polygon': {
            'chain': 'Polygon',
            'symbol': 'matic',
            'result': ploygonNFTs
        },
        'Fantom': {
            'chain': 'Fantom',
            'symbol': 'ftm',
            'result': ftmNFTs
        }
    };

	res.json(NFTs);
});

module.exports = router;