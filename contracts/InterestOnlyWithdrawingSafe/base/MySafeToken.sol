
contract MyEIP20NonStandardInterface {
    function transfer(address _to, uint256 _value) public;
    function transferFrom(address _from, address _to, uint256 _value) public;
}

contract MySafeToken {


    function doTransferIn(address asset, address from, uint amount) internal {
        MyEIP20NonStandardInterface token = MyEIP20NonStandardInterface(asset);

        bool result;

        token.transferFrom(from, address(this), amount);

        assembly {
            switch returndatasize()
            case 0 {                      // This is a non-standard ERC-20
                result := not(0)          // set result to true
            }
            case 32 {                     // This is a complaint ERC-20
                returndatacopy(0, 0, 32)
                result := mload(0)        // Set `result = returndata` of external call
            }
            default {                     // This is an excessively non-compliant ERC-20, revert.
                revert(0, 0)
            }
        }

        require(result);                          // revert() if result is false
    }

    function doTransferOut(address asset, address to, uint amount) internal {
        MyEIP20NonStandardInterface token = MyEIP20NonStandardInterface(asset);

        bool result;

        token.transfer(to, amount);

        assembly {
            switch returndatasize()
            case 0 {                      // This is a non-standard ERC-20
                result := not(0)          // set result to true
            }
            case 32 {                     // This is a complaint ERC-20
                returndatacopy(0, 0, 32)
                result := mload(0)        // Set `result = returndata` of external call
            }
            default {                     // This is an excessively non-compliant ERC-20, revert.
                revert(0, 0)
            }
        }
        require(result);                          // revert() if result is false
    }
}