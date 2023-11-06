import { WarpFactory } from "warp-contracts"

(async () => {
    const warp = WarpFactory.forTestnet()
    const contract = warp.contract("elRf9EZv8GHcW1YNBfCBRAGTy9GpeousJf6Pm1Ev-6k")
    const data = (await contract.readState()).cachedValue.state
    console.log(data)
})()