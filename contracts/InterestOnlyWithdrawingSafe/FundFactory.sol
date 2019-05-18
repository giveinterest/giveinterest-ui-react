import {FundProxy} from "./FundProxy.sol";

contract FundFactory {
    address private implementation;
    event NewFundCreated(address indexed collateralOwner, address proxyAddress);

    constructor(address _implementation) public {
        implementation = _implementation;
    }

    function createFund(address _interestWithdrawer, address[] calldata _markets)
    external
    {
        emit NewFundCreated(
            msg.sender,
            address(new FundProxy(address(implementation), msg.sender, _interestWithdrawer, _markets))
        );
    }

}