import {Proxy} from "./Proxy.sol";
import {FundDataInternal} from "./FundDataInternal.sol";
import {CERC20NoBorrowInterface} from "./interfaces/CERC20NoBorrowInterface.sol";
import {IERC20} from "./interfaces/IERC20.sol";

contract FundProxy is Proxy, FundDataInternal {
    constructor(
        address proxied,
        address _collateralOwner,
        address _interestWithdrawer,
        address[] memory _markets
        )
    public
    Proxy(proxied)
    {
        for (uint i=0; i < _markets.length; i++) {
            markets.push(_markets[i]);
            if (_markets[i] == cEth) {
                continue;
            }
            address underlying = CERC20NoBorrowInterface(_markets[i]).underlying();

            require(IERC20(underlying).approve(_markets[i], uint(-1)));
            require(IERC20(underlying).approve(uniswapFactory.getExchange(underlying), uint(-1)));
        }

        collateralOwner = _collateralOwner;
        interestWithdrawer = _interestWithdrawer;

    }

}