export default {
    IERC20: [
        "function transfer(address to, uint256 value) external returns (bool)",
        "function approve(address spender, uint256 value) external returns (bool)",
        "function transferFrom(address from, address to, uint256 value) external returns (bool)",
        "function totalSupply() external view returns (uint256)",
        "function balanceOf(address who) external view returns (uint256)",
        "function allowance(address owner, address spender) external view returns (uint256)",
        "event Transfer(address indexed from, address indexed to, uint256 value)",
        "event Approval(address indexed owner, address indexed spender, uint256 value)"
    ],
    cERC20: [
        "function mint(uint mintAmount) returns (uint)",
        "function repayBorrow(uint repayAmount) returns (uint)",
        "function repayBorrowBehalf(address borrower, uint repayAmount) returns (uint)",
        "function liquidateBorrow(address borrower, uint repayAmount, address cTokenCollateral) returns (uint)"
    ],
    cETH: [
        "function mint() payable",
        "function repayBorrow() payable",
        "function repayBorrowBehalf(address borrower) payable",
        "function liquidateBorrow(address borrower, address cTokenCollateral) payable"
    ],
    cToken: [
        "function redeem(uint redeemTokens) returns (uint)",
        "function redeemUnderlying(uint redeemAmount) returns (uint)",
        "function borrow(uint borrowAmount) returns (uint)",
        "function exchangeRateCurrent() view returns (uint)",
        "function getCash() view returns (uint)",
        "function totalBorrowsCurrent() view returns (uint)",
        "function borrowBalanceCurrent(address account) view returns (uint)",
        "function borrowRatePerBlock() view returns (uint)",
        "function totalSupply() view returns (uint)",
        "function balanceOf(address account) view returns (uint)",
        "function supplyRatePerBlock() view returns (uint)",
        "function totalReserves() view returns (uint)",
        "function reserveFactorMantissa() view returns (uint)"
    ],
    Comptroller: [
        "function enterMarkets(address[] cTokens) returns (uint[] memory)",
        "function exitMarket(address cToken) returns (uint)",
        "function getAssetsIn(address account) view returns (address[] memory)",
        "function getAccountLiquidity(address account) view returns (uint, uint, uint)"
    ],
    InterestGivingFund: [
        "function depositEth() external payable",
        "function depositToken(address cErc20Depositing, uint amount) external payable",
        "function withdrawInterestEach() external",
        "function withdrawInterestAsEth() external",
        "function withdrawInterestAsToken(address withdrawTokenAddress) external",
        "function withdrawAll() external",
        "function withdrawAllAsEth() external",
        "function withdrawAllAsToken(address withdrawTokenAddress) external",
        "function interestAvailableFromSingleToken(address cTokenAddress) view returns (uint)",
        "function interestAvailableAllTokensAsEth() view returns (uint)",
        "function interestAvailableAsToken(address withdrawTokenAddress) view returns (uint)",
        "function marketCount() external view returns (uint)",
        "function enterNewMarkets(address[] cTokens) external",
        "function withdrawEth() external",
        "function returnTokenAmount(address asset, uint amount) external",
        "function transferCollateralOwner(address newOwner) external",
        "function transferInterestWithdrawer(address newOwner) external",
        "function collateralOwner() view returns (address)",
        "function interestWithdrawer() view returns (address)",
        "function initialDepositCollateral(address cTokenAddress) view returns (uint)",
        "function markets(uint256 marketIndex) view returns (address)"
    ],
    InterestGivingFundFactory: [
        "function createFund(address _interestWithdrawer, address[] _markets) external",
        "event NewFundCreated(address indexed collateralOwner, address proxyAddress)"
    ]
}
