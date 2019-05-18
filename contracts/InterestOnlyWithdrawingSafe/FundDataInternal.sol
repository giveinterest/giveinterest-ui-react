import {ProxyData} from "./Proxy.sol";
import {FundHeader} from "./FundHeader.sol";

contract FundDataInternal is ProxyData, FundHeader {

    address internal collateralOwner;
    address internal interestWithdrawer;

    // cTokenAddress -> sum deposits denominated in underlying
    mapping(address => uint) internal initialDepositCollateral;
    // cTokenAddresses
    address[] internal markets;

}