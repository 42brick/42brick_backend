require('dotenv').config({path: '../.env'});

const express = require('express');
const Moralis = require('moralis/node');

const router = express.Router();

/**
 * @openapi
 * /get-nfts?addr={addr}:
 *   get:
 *     tags: [Get NFTs]
 *     description: Get NFTs in address
 *     parameters:
 *       - name: addr
 *         in: query
 *         required: true
 *         schema:
 *           type: string
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
 *                 Binance Smart Chain:
 *                   type: object
 *                   description: "NFTs in Binance Smart Chain"
 *                 Polygon:
 *                   type: object
 *                   description: "NFTs in Polygon"
 *                 Fantom:
 *                   type: object
 *                   description: "NFTs in Fantom"
 */
router.get('/', async(req, res, next) => {
    await Moralis.start({serverUrl: process.env.SERVER_URL, appId: process.env.APP_ID});

    const addr = req.query.addr;

    var options = [
        {chain: 'eth', address: `${addr}`},
        {chain: 'bsc', address: `${addr}`},
        {chain: 'matic', address: `${addr}`},
        {chain: 'ftm', address: `${addr}`}
    ];
    const ethNFTs = await Moralis.Web3API.account.getNFTs(options[0]);
    // const bscNFTs = await Moralis.Web3API.account.getNFTs(options[1]);
    // const ploygonNFTs = await Moralis.Web3API.account.getNFTs(options[2]);
    // const ftmNFTs = await Moralis.Web3API.account.getNFTs(options[3]);

    // const NFTs = {
    //     'Ethereum': ethNFTs
    //     // 'Binance Smart Chain': bscNFTs,
    //     // 'Polygon': ploygonNFTs,
    //     // 'Fantom': ftmNFTs
    // };
	res.json(ethNFTs);
});

module.exports = router;