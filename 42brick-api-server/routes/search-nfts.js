require('dotenv').config({path: '../.env'});

const express = require('express');
const Moralis = require('moralis/node');

const router = express.Router();

/**
 * @openapi
 * /search-nfts?addr={addr}:
 *   get:
 *     tags: [Get NFTs]
 *     description: search NFTs using keyword
 *     parameters:
 *       - name: keyword
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns NFTs searched by keyword.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/', async(req, res, next) => {
    
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