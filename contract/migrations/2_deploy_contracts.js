const BrickTokenERC721 = artifacts.require('BrickTokenERC721');

module.exports = function (depolyer) {
  depolyer.deploy(BrickTokenERC721);
};
