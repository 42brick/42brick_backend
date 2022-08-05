require('dotenv').config();

const express = require('express');
const Moralis = require('moralis/node');

const router = express.Router();

/**
 * @openapi
 * /nft-data:
 *   get:
 *     tags: [Get NFTs]
 *     description: search NFT using addr, id, and symbol
 *     parameters:
 *       - name: addr
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: symbol
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
router.get('/', async (req, res, next) => {
    
    await Moralis.start({serverUrl: process.env.SERVER_URL, appId: process.env.APP_ID});
    const addr = req.query.addr;
    const id = req.query.id;
    const symbol = req.query.symbol;

    const options = {
        address: addr,
        token_id: id,
        chain: symbol
    }
    console.log(options)
    const nftMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options)

	res.json(nftMetadata);
});

module.exports = router;