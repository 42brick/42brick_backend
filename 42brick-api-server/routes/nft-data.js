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
 *         examples:
 *           Sample:
 *            value: "0xb5643598496b159263c67bd0d25728713f5aad04"
 *            summary: example contract address
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         examples:
 *           Sample:
 *            value: "4096"
 *            summary: example token id
 *       - name: symbol
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         examples:
 *           Sample:
 *            value: "eth"
 *            summary: example chain symbol
 *     responses:
 *       200:
 *         description: Returns NFT's datas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token_address:
 *                   type: string
 *                 token_id:
 *                   type: string
 *                 owner_of:
 *                   type: string
 *                 block_number:
 *                   type: string
 *                 block_number_minted:
 *                   type: string
 *                 token_hash:
 *                   type: string
 *                 amount:
 *                   type: string
 *                 contract_type:
 *                   type: string
 *                 name:
 *                   type: string
 *                 symbol:
 *                   type: string
 *                 token_uri:
 *                   type: string
 *                 metadata:
 *                   type: string
 *                 last_token_uri_sync:
 *                   type: string
 *                 last_metadata_sync:
 *                   type: string
 */
router.get('/', async (req, res, next) => {
    
    await Moralis.start({serverUrl: process.env.SERVER_URL, appId: process.env.APP_ID});
    const addr = req.query.addr;
    const id = req.query.id;
    const symbol = req.query.symbol;

    console.log(addr)
    console.log(id)
    console.log(symbol)

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