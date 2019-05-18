export default {
    Networks: {
        Mainnet : "1",
        Rinkeby : "4"
    },
    Contracts: {
        cETH: {
            name: "Compound ETH",
            symbol: "cETH",
            decimals: 8,
            address: "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5",
            startBlock: 7710758
        },
        InterestGivingFundFactory: {
            address: "0x188797eC8daA7Ba50043aD7894CC3BF29953fA39",
            startBlock: 7766390
        }
    },
    Tokens: [
        {
            name: "Basic Attention Token",
            symbol: "BAT",
            decimals: 18,
            address: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
            startBlock: 3788558
        },
        {
            name: "DAI",
            symbol: "DAI",
            decimals: 18,
            address: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
            startBlock: 4752008
        },
        {
            name: "Augur",
            symbol: "REP",
            decimals: 18,
            address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
            startBlock: 5926311
        },
        {
            name: "USD Coin",
            symbol: "USDC",
            decimals: 6,
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            startBlock: 6082465
        },
        {
            name: "0x Protocol",
            symbol: "ZRX",
            decimals: 18,
            address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
            startBlock: 4145415
        }
    ],
    cTokens: [
        {
            name: "Compound Basic Attention Token",
            symbol: "cBAT",
            decimals: 8,
            address: "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
            underlying: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
            startBlock: 7710735
        },
        {
            name: "Compound Dai",
            symbol: "cDAI",
            decimals: 8,
            address: "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
            underlying: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
            startBlock: 7710752
        },
        {
            name: "Compound Augur",
            symbol: "cREP",
            decimals: 8,
            address: "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
            underlying: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
            startBlock: 7710755
        },
        {
            name: "Compound USD Coin",
            symbol: "cUSDC",
            decimals: 8,
            address: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
            underlying: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            startBlock: 7710760
        },
        {
            name: "Compound 0x",
            symbol: "cZRX",
            decimals: 8,
            address: "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
            underlying: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
            startBlock: 7710733
        }
    ]

}
