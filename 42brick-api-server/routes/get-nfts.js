require('dotenv').config();

const express = require('express');
const Moralis = require('moralis/node');

const router = express.Router();

/**
 * @openapi
 * /get-nfts:
 *   get:
 *     tags: [Get NFTs]
 *     description: Get NFTs in address
 *     parameters:
 *       - name: addr
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         examples:
 *           Sample:
 *            value: "0x921560673F20465c118072FF3A70D0057096c123"
 *            summary: example address
 *     responses:
 *       200:
 *         description: Returns NFTs in address.
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
 *                           type: string
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: string
 *                           maxItems: 0
 *                         status:
 *                           type: string
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
 *                           type: string
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: string
 *                           maxItems: 0
 *                         status:
 *                           type: string
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
 *                           type: string
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: string
 *                           maxItems: 0
 *                         status:
 *                           type: string
 *                 Fantom:
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
 *                           type: string
 *                         result:
 *                           type: array
 *                           items: 
 *                             type: string
 *                           maxItems: 0
 *                         status:
 *                           type: string
 */
router.get('/', async (req, res, next) => {

    await Moralis.start({serverUrl: process.env.SERVER_URL, appId: process.env.APP_ID});
    const addr = req.query.addr;
    
    const options = [
        {chain: 'eth', address: addr},
        {chain: 'bsc', address: addr},
        {chain: 'matic', address: addr},
        {chain: 'ftm', address: addr}
    ];

    const ethNFTs = await Moralis.Web3API.account.getNFTs(options[0]);
    const bscNFTs = await Moralis.Web3API.account.getNFTs(options[1]);
    const ploygonNFTs = await Moralis.Web3API.account.getNFTs(options[2]);
    const ftmNFTs = await Moralis.Web3API.account.getNFTs(options[3]);

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
