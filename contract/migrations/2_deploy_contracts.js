const BrickToken = artifacts.require('BrickToken');

module.exports = function (depolyer) {
  depolyer.deploy(BrickToken);
};
