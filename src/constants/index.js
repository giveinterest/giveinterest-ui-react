import ABIs from "./ABIs-readable";
import CompoundMainnet from "./Compound-mainnet";
import CompoundStaging from "./Compound-rinkeby";

const Constants = () => {
    if (!window.ethereum) {
        return {
            ABIs: {...ABIs},
            ...CompoundMainnet
        }
    }

    if (window.ethereum.networkVersion == "1") {
        console.log("selected network: mainnet")
        return {
            ABIs: {...ABIs},
            ...CompoundMainnet
        }
    } else if (window.ethereum.networkVersion == "4") {
        console.log("selected network: rinkeby")
        return {
            ABIs: {...ABIs},
            ...CompoundStaging
        }
    }
    console.error("selected network: unknown")

    return {
        ABIs: {...ABIs},
        ...CompoundMainnet
    }
}

export default Constants();
