# blockchain_README.md

### Parking NFTs
### Spring 2020 Developing Blockchain                            


## Creating an NFT


1) Using the directions found here, install the Interplanetary File System (IPFS)

https://docs.ipfs.io/install/command-line/#system-requirements

2) Using these directions, initialize the IPFS repository.

https://docs.ipfs.io/how-to/command-line-quick-start/

3) These instructions are modified from the video found here:
https://www.youtube.com/watch?v=IFpU4TNwXec

  a) In an empty directory named nft, run
```
     truffle init
```
  b) In the same directory run
```
  npm install @openzeppelin/contracts
```

c) Within the contracts directory, create UniqueAsset.sol.
```
// UniqueAsset.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract UniqueAsset is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  constructor() ERC721("UniqueAsset","UNA") {}
  function awardItem(address recipient, string memory metadata)
  public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(recipient,newItemId);
    _setTokenURI(newItemId,metadata);
    return newItemId;
  }
}
```
d) Within the migrations directory, create 2_deploy_contracts.js.

```
const UniqueAsset = artifacts.require("UniqueAsset");
module.exports = function(deployer) {
  deployer.deploy(UniqueAsset);
}

```
e) In a shell in the nft directory, run

```
    npm install fs
```
f) In a shell in the nft directory, run
```
    npm install @truffle/hdwallet-provider@1.2.3
```
g) Modify truffle-config.js so it has compiler version 0.8.1 and set docker to false.
```
    // Configure your compilers
    compilers: {
      solc: {
        version: "0.8.1",    // Fetch exact version from solc-bin (default: truffle's version)
        docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
        settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
        enabled: false,
        runs: 200
        },
        evmVersion: "byzantium"
        }
      }
    },
```
   h) From the nft directory, run
```
      mkdir credential
```
i) Place a simple file in the credential directory
```
      echo "A Parking NFT with Spot ID: A0023" > parking_A0023.txt
```
j) Add the credential file to ipfs and make a copy of the content identifier (CID). The CID begins with "Qm".
```
      cd credential
      ipfs add parking_A0023.txt
```
<!-- added QmRGTttkKnnykN5S6uLVJfXC6L9p1Smt8fKdC3H2uqMCy6 parking_A0023.txt -->
k) Add this metadata file to the credential directory. Name it parking_A0023_Metadata.json. Include the CID associated with credential.txt.
```
  {
     "name" : "Alice",
     "description" : "A Parking NFT with spot ID: A0023",
     "parkingID" : "A0023",
     "file" : "https//ipfs.io/ipfs/THE_CREDENTIAL_CID_GOES_HERE"，
     "is_valid" : True
   }
```
l) Add the metadata file to ipfs:
```
      ipfs add parking_A0023_Metadata.json
```
<!-- added QmViiY3qMMCq7psvhyZ7tUhLRyEx8vbFK7gbj7qVQJK6ji parking_A0023_Metadata.json -->
m) Examine your metadata file using ipfs:
```
      ipfs cat /ipfs/THE_METADATA_CID_GOES_HERE
```
n) From the nft directory, compile the nft contract:
```
   truffle compile
```

   o) Run Ganache Workspace and point to nft/truffle-config.js.

   p) From the nft directory, deploy the NFT contract to Ganache:
```
   truffle migrate
```
   q) Run the Truffle console:
```
   truffle console
```
   r) Access the contract:
```
   let contract = await UniqueParking.deployed();
```
   s) Visit Ganache and make a copy of the first account address (include the "0x"). This becomes the first argument to the awardItem call. Use the CID of the metadata file as the second argument. Run the following command in the truffle console:
```
   let result = await contract.awardItem("ACCOUNT_ADDR_GOES_HERE","https//ipfs.io/ipfs/THE_META_DATA_CID_GOES_HERE")
```
   t) Examine the name of the contract:
```
   let nameOfToken = await contract.name()
   nameOfToken
```

   u) Examine the balance of the first account:
```
   let balance = await contract.balanceOf("ACCOUNT_ADDR_GOES_HERE")
   balance.toNumber()
```
   v) Account[0] is the owner of the Token ID 1.
```
    let owner = await contract.ownerOf("1")
    owner
```
   x) Transfer the token to the second account.
```
   account_from = "0xTHE_ADDRESS_OF_THE_FIRST_ACCOUNT"
   account_to = "0xTHE_ADDRESS_OF_THE_SECOND_ACCOUNT"
   let transfer = await contract.transferFrom(account_from, account_to, 1)
   transfer
```
   y) Account[1] is the new owner of the Token ID 1.

