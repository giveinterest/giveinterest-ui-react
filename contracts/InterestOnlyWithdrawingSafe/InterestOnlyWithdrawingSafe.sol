pragma solidity ^0.5.2;

import {IERC20} from "./interfaces/IERC20.sol";
import {CTokenNoBorrowInterface} from "./interfaces/CTokenNoBorrowInterface.sol";
import {CERC20NoBorrowInterface} from "./interfaces/CERC20NoBorrowInterface.sol";
import {CEtherNoBorrowInterface} from "./interfaces/CEtherNoBorrowInterface.sol";
import {UniswapExchangeInterface} from "./interfaces/UniswapExchangeInterface.sol";
import {MySafeToken} from "./base/MySafeToken.sol";
import {FundData} from "./FundData.sol";

contract InterestOnlyWithdrawingSafe is FundData, MySafeToken {

    // deposits
    function depositEth() external payable {
        require(msg.sender == collateralOwner && msg.value > 0);
        CEtherNoBorrowInterface(cEth).mint.value(msg.value)();
        initialDepositCollateral[cEth] = initialDepositCollateral[cEth] + msg.value;
    }
    function depositToken(CERC20NoBorrowInterface cErc20Depositing, uint amount) external payable {
        require(msg.sender == collateralOwner && amount > 0);
        doTransferIn(cErc20Depositing.underlying(), msg.sender, amount);
        cErc20Depositing.mint(amount);
        initialDepositCollateral[address(cErc20Depositing)] = initialDepositCollateral[address(cErc20Depositing)] + amount;
    }

    // interest receiver
    // withdraw interest from each collateral type, sends each individually
    function withdrawInterestEach() external {
        require(msg.sender == interestWithdrawer);
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            if (initialDepositCollateral[cTokenAddress] > 0) {
                uint balanceInterestAvailable = CTokenNoBorrowInterface(cTokenAddress).balanceOfUnderlying(address(this)) - initialDepositCollateral[cTokenAddress];
                CTokenNoBorrowInterface(cTokenAddress).redeemUnderlying(balanceInterestAvailable);
                if (cTokenAddress != cEth) {
                    doTransferOut(CERC20NoBorrowInterface(cTokenAddress).underlying(), msg.sender, balanceInterestAvailable);
                } else {
                    address(msg.sender).send(balanceInterestAvailable);
                }
            }
        }
    }
    // uniswap each token interest to eth, withdraw eth
    function withdrawInterestAsEth() external {
        require(msg.sender == interestWithdrawer);
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            if (initialDepositCollateral[cTokenAddress] > 0) {
                uint balanceInterestAvailable = CTokenNoBorrowInterface(cTokenAddress).balanceOfUnderlying(address(this)) - initialDepositCollateral[cTokenAddress];
                CTokenNoBorrowInterface(cTokenAddress).redeemUnderlying(balanceInterestAvailable);
                if (cTokenAddress != cEth) {
                    UniswapExchangeInterface(uniswapFactory.getExchange(CERC20NoBorrowInterface(cTokenAddress).underlying())).tokenToEthSwapInput(balanceInterestAvailable, 1, block.timestamp+1);
                }
            }
        }
        address(msg.sender).send(address(this).balance);
    }
    // uniswap each token interest to eth, uniswap sum eth to withdraw-token
    function withdrawInterestAsToken(address withdrawTokenAddress) external {
        require(msg.sender == interestWithdrawer);
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            if (initialDepositCollateral[cTokenAddress] > 0) {
                uint balanceInterestAvailable = CTokenNoBorrowInterface(cTokenAddress).balanceOfUnderlying(address(this)) - initialDepositCollateral[cTokenAddress];
                CTokenNoBorrowInterface(cTokenAddress).redeemUnderlying(balanceInterestAvailable);
                if (cTokenAddress != cEth) {
                    UniswapExchangeInterface(uniswapFactory.getExchange(CERC20NoBorrowInterface(cTokenAddress).underlying())).tokenToEthSwapInput(balanceInterestAvailable, 1, block.timestamp+1);
                }
            }
        }
        UniswapExchangeInterface(uniswapFactory.getExchange(withdrawTokenAddress)).ethToTokenTransferInput.value(address(this).balance)(1, block.timestamp+1, msg.sender);
    }

    // owner
    function withdrawAll() external {
        require(msg.sender == collateralOwner);
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            if (initialDepositCollateral[cTokenAddress] > 0) {
                initialDepositCollateral[cTokenAddress] = 0;
                CTokenNoBorrowInterface(cTokenAddress).redeem(IERC20(cTokenAddress).balanceOf(address(this)));
                if (markets[i] != cEth) {
                    address underlying = CERC20NoBorrowInterface(cTokenAddress).underlying();
                    doTransferOut(underlying, msg.sender, IERC20(underlying).balanceOf(address(this)));
                } else {
                    address(msg.sender).send(address(this).balance);
                }
            }
        }
    }
    function withdrawAllAsEth() external {
        require(msg.sender == collateralOwner);
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            if (initialDepositCollateral[cTokenAddress] > 0) {
                initialDepositCollateral[cTokenAddress] = 0;
                CTokenNoBorrowInterface(cTokenAddress).redeem(IERC20(cTokenAddress).balanceOf(address(this)));
                if (markets[i] != cEth) {
                    address underlying = CERC20NoBorrowInterface(cTokenAddress).underlying();
                    UniswapExchangeInterface(uniswapFactory.getExchange(underlying)).tokenToEthSwapInput(IERC20(underlying).balanceOf(address(this)), 1, block.timestamp+1);
                }
            }
        }
        address(msg.sender).send(address(this).balance);
    }
    function withdrawAllAsToken(address withdrawTokenAddress) external {
        require(msg.sender == collateralOwner);
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            if (initialDepositCollateral[cTokenAddress] > 0) {
                initialDepositCollateral[cTokenAddress] = 0;
                CTokenNoBorrowInterface(cTokenAddress).redeem(IERC20(cTokenAddress).balanceOf(address(this)));
                if (markets[i] != cEth) {
                    address underlying = CERC20NoBorrowInterface(cTokenAddress).underlying();
                    UniswapExchangeInterface(uniswapFactory.getExchange(underlying)).tokenToEthSwapInput(IERC20(underlying).balanceOf(address(this)), 1, block.timestamp+1);
                }
            }
        }
        UniswapExchangeInterface(uniswapFactory.getExchange(withdrawTokenAddress)).ethToTokenTransferInput.value(address(this).balance)(1, block.timestamp+1, msg.sender);
    }

    // views
    function interestAvailableFromSingleToken(address cTokenAddress) public returns (uint) {
        uint ethCanWithdraw = 0;
        if (initialDepositCollateral[cTokenAddress] > 0) {
            uint underlyingBalance = CTokenNoBorrowInterface(cTokenAddress).balanceOfUnderlying(address(this));
            if (underlyingBalance < initialDepositCollateral[cTokenAddress]) {
                return 0;
            } else {
                return underlyingBalance - initialDepositCollateral[cTokenAddress];
            }
        }
        return 0;
    }
    function interestAvailableAllTokensAsEth() public returns (uint) {
        uint ethCanWithdraw = 0;
        for (uint i=0; i < markets.length; i++) {
            address cTokenAddress = markets[i];
            uint interestAvailable = interestAvailableFromSingleToken(cTokenAddress);
            if (interestAvailable == 0) {
                continue;
            }
            if (cTokenAddress == cEth) {
                ethCanWithdraw = ethCanWithdraw + interestAvailable;
            } else {
                ethCanWithdraw = ethCanWithdraw + UniswapExchangeInterface(uniswapFactory.getExchange(CERC20NoBorrowInterface(cTokenAddress).underlying())).getTokenToEthInputPrice(interestAvailable);
            }
        }
        return ethCanWithdraw;
    }
    function interestAvailableAsToken(address withdrawTokenAddress) external returns (uint) {
        uint ethCanWithdraw = interestAvailableAllTokensAsEth();
        if (ethCanWithdraw == 0) {
            return 0;
        } else {
            return UniswapExchangeInterface(uniswapFactory.getExchange(withdrawTokenAddress)).getEthToTokenInputPrice(ethCanWithdraw);
        }
    }
    function marketCount() external view returns (uint) {
        return markets.length;
    }

    // owner backup/safty functions
    // TODO: dont allow duplicate markets, maybe enter new one at a time.
    function enterNewMarkets(address[] calldata cTokens) external {
        require(msg.sender == collateralOwner);
        for (uint i=0; i < cTokens.length; i++) {
            markets.push(cTokens[i]);
            address underlying = CERC20NoBorrowInterface(cTokens[i]).underlying();
            tokenAllowAll(underlying, cTokens[i]);
            tokenAllowAll(underlying, uniswapFactory.getExchange(underlying));
        }
    }
    function withdrawEth() external {
        require(msg.sender == collateralOwner);
        msg.sender.transfer(address(this).balance);
    }
    function returnTokenAmount(address asset, uint amount) external {
        require(msg.sender == collateralOwner);
        doTransferOut(asset, msg.sender, amount);
    }
    function transferCollateralOwner(address newOwner) external {
        require(msg.sender == collateralOwner);
        require(newOwner != address(0));
        collateralOwner = newOwner;
    }
    function transferInterestWithdrawer(address newOwner) external {
        require(msg.sender == interestWithdrawer || msg.sender == collateralOwner);
        require(newOwner != address(0));
        interestWithdrawer = newOwner;
    }

    // allow receive eth
    function() external payable { }

    // internal
    function tokenAllowAll(address asset, address allowee) internal {
        require(IERC20(asset).approve(allowee, uint(-1)));
    }

}
