// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Erc20Token {
    mapping(address => uint256) private _balance;

    uint256 public _totalSupply;

    string private _name;

    string private _symbol;

    uint8 private _decimals;

    mapping(address => mapping(address => uint256)) private _allowBalance;

    constructor(
        string memory nameValue,
        string memory symbolValue,
        uint8 decimalsValue,
        uint256 totalSupplyValue
    ) {
        _name = nameValue;
        _symbol = symbolValue;
        _decimals = decimalsValue;
        _totalSupply = totalSupplyValue;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balance[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function _transfer(
        address _owner,
        address _to,
        uint256 _value
    ) internal returns (bool) {
        require(_owner != address(0), "ERC20: transfer from the zero address");
        require(_to != address(0), "ERC20: transfer to the zero address");
        require(
            _balance[_owner] >= _value,
            "ERC20: transfer amount exceeds balance"
        );
        _balance[_owner] = _balance[_owner] - _value;
        _balance[_to] = _balance[_to] + _value;
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool) {
        _transfer(_from, _to, _value);
        // _approve(_from, _to, _allowBalance[_from][_to] - _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        _approve(msg.sender, _spender, _value);
        return true;
    }

    function _approve(
        address _owner,
        address _spender,
        uint256 _value
    ) internal returns (bool) {
        require(_owner != address(0), "ERC20: approve from the zero address");
        require(_spender != address(0), "ERC20: approve to the zero address");
        _allowBalance[_owner][_spender] = _value;
        return true;
    }

    function allowance(
        address _owner,
        address _spender
    ) public view returns (uint256 remaining) {
        return _allowBalance[_owner][_spender];
    }

    function increaseAllowance(
        address _spender,
        uint256 _value
    ) public returns (bool) {
        _approve(
            msg.sender,
            _spender,
            _allowBalance[msg.sender][_spender] + _value
        );
        return true;
    }

    function decreaseAllowance(
        address _spender,
        uint256 _value
    ) public returns (bool) {
        _approve(
            msg.sender,
            _spender,
            _allowBalance[msg.sender][_spender] - _value
        );
        return true;
    }

    function _burn(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), value);

        uint256 accountBalance = _balance[account];
        require(accountBalance >= value, "ERC20: burn value exceeds balance");
        _totalSupply = _totalSupply - value;
        _balance[account] = accountBalance - value;

        _afterTokenTransfer(account, address(0), value);
    }

    function _mint(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from the zero address");
        _beforeTokenTransfer(address(0), account, value);

        _totalSupply += value;
        _balance[account] = _balance[account] + value;
        _afterTokenTransfer(address(0), account, value);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}
