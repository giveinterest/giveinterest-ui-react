export default {
    Networks: {
        "Mainnet" : 1,
        "Rinkeby" : 4
    },
    Contracts: {
        cETH: {
            name: "Compound ETH",
            symbol: "cETH",
            decimals: 8,
            address: "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e",
            startBlock: 1
        },
        InterestGivingFundLibrary: {
            address: "0x3172bCEE1dE1cAaD06f9C6305f2c8b00dE5d5292",
            startBlock: 4360449
        },
        InterestGivingFundFactory: {
            address: "0x2F15C4439fCEc28483db12d6F374ce781F94b60A",
            startBlock: 4360449
        }
    },
    Tokens: [
        {
            name: "Basic Attention Token",
            symbol: "BAT",
            decimals: 18,
            address: "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",
            startBlock: 1
        },
        {
            name: "DAI",
            symbol: "DAI",
            decimals: 18,
            address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
            startBlock: 1
        },
        {
            name: "Augur",
            symbol: "REP",
            decimals: 18,
            address: "0x6e894660985207feb7cf89Faf048998c71E8EE89",
            startBlock: 1
        },
        {
            name: "Usdc",
            symbol: "USDC",
            decimals: 6,
            address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
            startBlock: 1
        },
        {
            name: "0x Protocol",
            symbol: "ZRX",
            decimals: 18,
            address: "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6",
            startBlock: 1
        }
    ],
    cTokens: [
        {
            name: "Compound Basic Attention Token",
            symbol: "cBAT",
            decimals: 8,
            address: "0xEBf1A11532b93a529b5bC942B4bAA98647913002",
            underlying: "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",
            startBlock: 1
        },
        {
            name: "Compound Dai",
            symbol: "cDAI",
            decimals: 8,
            address: "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14",
            underlying: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
            startBlock: 1
        },
        {
            name: "Compound Augur",
            symbol: "cREP",
            decimals: 8,
            address: "0xEBe09eB3411D18F4FF8D859e096C533CAC5c6B60",
            underlying: "0x6e894660985207feb7cf89Faf048998c71E8EE89",
            startBlock: 1
        },
        {
            name: "Compound USDC",
            symbol: "cUSDC",
            decimals: 8,
            address: "0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1",
            underlying: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
            startBlock: 1
        },
        {
            name: "Compound 0x",
            symbol: "cZRX",
            decimals: 8,
            address: "0x52201ff1720134bBbBB2f6BC97Bf3715490EC19B",
            underlying: "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6",
            startBlock: 1
        }
    ]

}
