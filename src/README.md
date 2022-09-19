# explorer

## locally run

1. build
   ```bash
   cp docker-compose.override.example.yml docker-compose.override.yml

   docker-compose -p wf build
   ```
1. start
   ```bash
   docker-compose -p wf up -d
   ```
1. logs
   ```bash
   docker-compose -p wf logs -f backend
   ```
1. stop
   ```bash
   docker-compose -p wf stop
   # or with cleaning
   docker-compose -p wf down
   ```
1. migrate data from redis to postgres
   ```bash
   docker-compose -p wf exec -T wf yarn run migrate:up
   ```
   
## data samples

### block

   ```bash
   {
      "baseFeePerGas":"0x7",
      "difficulty":"2",
      "extraData":"0xd883010a08846765746888676f312e31362e36856c696e757800000000000000e9428d4f2d93db9e696d1193e054e65ccb1262d3bedd54aa058e121d3a3105690d6f02810cdb70d14b0514e0973b4a7542cd371d46597021f6e402d87110a5bf00",
      "gasLimit":8000000,
      "gasUsed":0,
      "hash":"0x535439f3a14fe9ab448b02b24ca1ee6b7fe47c3454d92d7c415d1ee23d9ba0ea",
      "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "miner":"0x0000000000000000000000000000000000000000",
      "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x0000000000000000",
      "receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size":610,
      "stateRoot":"0x73907e5a0f54a45b9a40675e1522395c04cb558a7bd552dc8b2a9d592aaca6fd",
      "timestamp":1633532453,
      "totalDifficulty":"6729081",
      "transactions":[
         #тут хеши транзакций
      ],
      "transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "uncles":[
         
      ],
      "parentHashes":[
         "0x4d21f4568dd30564a8109e1309b0800284c076a83c83af7ececcfd9bd3703b73"
      ],
      "height":3364540
   }
   ```

### transaction

   ```bash
  {
   "blockNumber":3427500,
   "from":"0x45B996A9E428c4727707A4D7e0C7f8BC1e5c3eef",
   "gas":21000,
   "gasPrice":"1000000007",
   "maxFeePerGas":"1000000014",
   "maxPriorityFeePerGas":"1000000000",
   "hash":"0xe1e7e37bd269df10641d379d80d0ec5a0a70b1cdab0d3e861ee9c00a638ee407",
   "input":"0x",
   "nonce":13,
   "to":"0x1CAd72F28B34141dB68D37f43b18d5e120c51f2A",
   "transactionIndex":0,
   "value":"10000000000000000",
   "type":2,
   "accessList":[
      
   ],
   "chainId":"0x13e509b5",
   "v":"0x0",
   "r":"0x1ecfb659b0d40baf8a68826ce67e7b602928162487eaddd7acf0d3ac637da2b8",
   "s":"0x6fe94909b071d551dc5963235f3a0bed99a91ec27d068f1d20c35c5aa7859eea",
   "TokenOp":"0x0",
   "TokenAddr":"0x0000000000000000000000000000000000000000",
   "TokenStandard":"0x0",
   "TokenName":"",
   "TokenSymbol":"",
   "TokenVersion":"",
   "TokenTotalSupply":0,
   "TokenDecimals":0,
   "TokenBaseUrl":"",
   "TokenTo":"0x0000000000000000000000000000000000000000",
   "TokenFrom":"0x0000000000000000000000000000000000000000",
   "TokenApproved":false,
   "TokenValue":null,
   "TokenTokenId":0,
   "TokenMetadata":"",
   "TokenData":"0x",
   "blockHashes":[
      "0xad76bb3455f5f4ad5cad718288a3d4a5bb2e3af3a326618c2a7d62c119051d4a"
   ]
}
   ```

### account

   ```bash
   {
   "address":"0xe4157c291008529276e70b13b411a99159da11a9",
   "transactions":[
      # тут транзакции полностью
   ],
   "balance":"1999999.999915999999412"
}
   ```
