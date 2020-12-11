var Migrations = artifacts.require("./contracts/Migrations.sol");
var SenateAlpha = artifacts.require("./contracts/SenateAlpha.sol");
var Timelock = artifacts.require("./contracts/Timelock.sol");
var RubiconMarket = artifacts.require("./contracts/RubiconMarket.sol");
var RBCN = artifacts.require("./contracts/RBCN.sol");

module.exports = function(deployer, network, accounts) {
  var admin = accounts[0];

  // deployer.deploy(Migrations).then(function() {
  // return deployer.deploy(Timelock, Migrations.address, 0).then(function(){   // Takes admin and initial delay that must exceed the minimum delay... ZERO FOR TESTING NOT PRODUCTION READY
  //   //Give admin token balance and set total supply
  //   return deployer.deploy(SenateAlpha, Timelock.address, RBCN.address, admin); //gaurdian of senate is admin
  // });
  // });

  //TO DO: Send Community Proportion of RBCN to Migrations then to Exchange
  //TO DO: Build logic in Migrations/RBCN to handle that
  deployer.deploy(Migrations).then(function() {
    return deployer.deploy(RBCN, admin).then(function() {
      return deployer.deploy(Timelock, Migrations.address, 0).then(function(){   // Takes admin and initial delay that must exceed the minimum delay... ZERO FOR TESTING NOT PRODUCTION READY
        //Give admin token balance and set total supply
        return deployer.deploy(SenateAlpha, Timelock.address, RBCN.address, admin).then(function(){ //gaurdian of senate is admin
          return deployer.deploy(RubiconMarket, 1735693261, RBCN.address);
        });
      });
    });
  });

  //Timelock admin should be SenateAlpha... first action taken by Senate should be to make itself admin of Timelock.. better way to do this??
  // deployer.deploy(Timelock, Migrations.address, 0).then(function(){   // Takes admin and initial delay that must exceed the minimum delay... ZERO FOR TESTING NOT PRODUCTION READY
  //   //Give admin token balance and set total supply
  //   return deployer.deploy(SenateAlpha, Timelock.address, RBCN.address, admin); //gaurdian of senate is admin
  // });
};
