import React, { useEffect, useState, useContext } from 'react'
import {ethers, utils} from "ethers"
import Constants from "../constants/index"
import {OwnedFundAddressesContext} from "./OwnedFundAddressesState"
import FundContract from "../library/FundContract"
import ERC20 from "../library/ERC20Contract"

export const FundDetailsStateContext = React.createContext({})

const FundDetailsState = (props) => {

    const factoryAddress = useContext(OwnedFundAddressesContext)
    let fundContract = FundContract.FundContract(props.contractAddress).contract

    const [fundContractState, setFundContractState] = useState()
    const [interestWithdrawerState, setInterestWithdrawer] = useState("")
    const [collateralOwnerState, setCollateralOwner] = useState("")
    const [marketCountState, setMarketCount] = useState(0)
    const [tokenAddressesAvailableToDepositState, setTokenAddressesAvailableToDeposit] = useState([])
    const [intialDepositCollateralState, setIntialDepositCollateral] = useState({})
    const [interestAvailableState, setInterestAvailableState] = useState({})
    const [tokenBalancesState, setTokenBalancesState] = useState({})
    const [tokenAllowanceState, setTokenAllowanceState] = useState({})

    useEffect(() => {
        setFundContractState(FundContract.FundContract(props.contractAddress))
    }, [factoryAddress])

    useEffect(() => {
        async function resolve() {
            let result = await fundContract.marketCount()
            // console.log("marketCount: " + result)
            setMarketCount(result.toNumber())
        }
        resolve()
    }, [factoryAddress])

    useEffect(() => {
        async function resolve() {
            let result = await fundContract.interestWithdrawer()
            // console.log("interestWithdrawer: " + result)
            setInterestWithdrawer(result)
        }
        resolve()
    }, [factoryAddress])

    useEffect(() => {
        async function resolve() {
            let result = await fundContract.collateralOwner()
            // console.log("collateralOwner: " + result)
            setCollateralOwner(result)
        }
        resolve()
    }, [factoryAddress])

    useEffect(() => {
        async function resolve() {
            let markets = []
            for (let i = 0; i < marketCountState; i++) {
                let result = await fundContract.markets(i)
                // console.log("markets[" + i + "]: " + result)
                markets.push(result)
            }
            setTokenAddressesAvailableToDeposit(markets)
        }
        resolve()
    }, [marketCountState])

    useEffect(() => {
        async function resolve() {
            let intialDepositCollateral = {}
            for (let i = 0; i < tokenAddressesAvailableToDepositState.length; i++) {
                let cTokenAddress = tokenAddressesAvailableToDepositState[i]
                let decimals = 18
                if (cTokenAddress == Constants.Contracts.cETH.address) {
                    let result = await fundContract.initialDepositCollateral(cTokenAddress)
                    console.log("initialDepositCollateral: " + result)
                    intialDepositCollateral[cTokenAddress] = parseFloat(utils.formatUnits(result, 18)).toFixed(8)
                } else {
                    let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
                    let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
                    let result = await fundContract.initialDepositCollateral(cTokenAddress)
                    console.log("initialDepositCollateral: " + result)
                    intialDepositCollateral[cTokenAddress] = parseFloat(utils.formatUnits(result, tokenDetails.decimals)).toFixed(8)

                }
            }
            setIntialDepositCollateral(intialDepositCollateral)
        }
        resolve()
    }, [tokenAddressesAvailableToDepositState])

    useEffect(() => {
        async function resolve() {
            let interestAvailable = {}
            for (let i = 0; i < tokenAddressesAvailableToDepositState.length; i++) {
                let cTokenAddress = tokenAddressesAvailableToDepositState[i]
                if (cTokenAddress == Constants.Contracts.cETH.address) {
                    let result = await fundContract.interestAvailableFromSingleToken(cTokenAddress)
                    // console.log("interestAvailable: " + result)
                    interestAvailable[cTokenAddress] = parseFloat(utils.formatUnits(result, 18)).toFixed(8)
                } else {
                    let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
                    let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
                    let result = await fundContract.interestAvailableFromSingleToken(cTokenAddress)
                    // console.log("interestAvailable: " + result)
                    interestAvailable[cTokenAddress] = parseFloat(utils.formatUnits(result, tokenDetails.decimals)).toFixed(8)
                }

            }
            setInterestAvailableState(interestAvailable)
        }
        resolve()
    }, [tokenAddressesAvailableToDepositState])

    useEffect(() => {
        async function resolve() {
            let tokensAvailable = {}
            for (let i = 0; i < tokenAddressesAvailableToDepositState.length; i++) {
                let cTokenAddress = tokenAddressesAvailableToDepositState[i]
                if (cTokenAddress === Constants.Contracts.cETH.address) {
                    let balance = await new ethers.providers.Web3Provider(window.ethereum).getSigner().getBalance()
                    // console.log("ETH " + balance.toString())
                    tokensAvailable["ETH"] = balance.toString()
                } else {
                    let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
                    let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
                    let tokenContract = ERC20.ERC20TokenContract(tokenDetails.address).contract
                    let balance = await ERC20.balanceOf(tokenContract, fundContract.collateralOwner())
                   // console.log(tokenDetails.symbol + " " + balance.toString())
                    tokensAvailable[tokenDetails.symbol] = balance.toString()
                }
            }
            setTokenBalancesState(tokensAvailable)
        }
        resolve()
    }, [tokenAddressesAvailableToDepositState])

    useEffect(() => {
        async function resolve() {
            let tokensAllowance = {}
            for (let i = 0; i < tokenAddressesAvailableToDepositState.length; i++) {
                let cTokenAddress = tokenAddressesAvailableToDepositState[i]
                if (cTokenAddress !== Constants.Contracts.cETH.address) {
                    let underlyingAddress = Constants.cTokens.filter(cToken => cToken.address === cTokenAddress)[0].underlying
                    let tokenDetails = Constants.Tokens.filter(token => token.address === underlyingAddress)[0]
                    let tokenContract = ERC20.ERC20TokenContract(tokenDetails.address).contract
                    let tokenAllowance = await ERC20.allowance(tokenContract, fundContract.collateralOwner(), fundContract.address)
                    let tokenTotalSupply = await ERC20.totalSupply(tokenContract)
                    if (tokenAllowance.gt(tokenTotalSupply)) {
                        tokensAllowance[tokenDetails.symbol] = true
                    } else {
                        tokensAllowance[tokenDetails.symbol] = false
                    }
                }
            }
            setTokenAllowanceState(tokensAllowance)
        }
        resolve()
    }, [tokenAddressesAvailableToDepositState])

    return (
        <FundDetailsStateContext.Provider value={
            {
                fundContractState,
                interestWithdrawerState,
                collateralOwnerState,
                marketCountState,
                tokenAddressesAvailableToDepositState,
                intialDepositCollateralState,
                interestAvailableState,
                tokenBalancesState,
                tokenAllowanceState
            }}>
            {props.children}
        </FundDetailsStateContext.Provider>
    )

}

export default FundDetailsState