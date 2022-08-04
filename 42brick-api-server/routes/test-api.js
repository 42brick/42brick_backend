const express = require('express');
const Moralis = require('moralis/node');
const router = express.Router();

getNFTs = async (addr) => {
    await Moralis.start({serverUrl: SERVER_URL, appId: APP_ID});
    
    const options = {chain: 'eth', address: `${addr}`};
    const ethNFTs = await Moralis.Web3API.account.getNFTs(options);

    return ethNFTs;
}

/**
 * @openapi
 * /test-api:
 *   get:
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
 */
router.get('/', function (req, res, next) {
    const addr = req.query.addr;
    const NFTs = getNFTs(addr);
	res.json(NFTs);
});

module.exports = router;