const UniqueParking = artifacts.require("UniqueParking");
module.exports = function(deployer) {
  deployer.deploy(UniqueParking);
}