contract CERC20NoBorrowInterface {
    function mint(uint mintAmount) external returns (uint);
    address public underlying;
}
