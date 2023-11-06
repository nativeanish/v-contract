import { WarpFactory } from "warp-contracts"

(async () => {
    const warp = WarpFactory.forTestnet()
    const contract = warp.contract("xH1EwPiTTqCMOXReK2r4BApDas1EpJf50XY9BRlAPMQ")
    const data = (await contract.readState()).cachedValue.state
    console.log(data)
})()