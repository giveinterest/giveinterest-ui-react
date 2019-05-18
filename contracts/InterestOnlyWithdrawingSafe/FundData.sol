import {ProxyData} from "./Proxy.sol";
import {FundHeader} from "./FundHeader.sol";

contract FundData is ProxyData, FundHeader {

    address public collateralOwner;
    address public interestWithdrawer;

    // cTokenAddress -> sum deposits denominated in underlying
    mapping(address => uint) public initialDepositCollateral;
    // cTokenAddresses
    address[] public markets;

}