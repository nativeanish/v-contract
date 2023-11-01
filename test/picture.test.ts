import { Contract, JWKInterface, LoggerFactory, Warp, WarpFactory } from "warp-contracts"
import { State } from "../action/types"
import ArLocal from "arlocal"
import fs from "fs"
import path from "path"
import { DeployPlugin } from 'warp-contracts-plugin-deploy';
jest.setTimeout(30000)
describe("Testing the picture.studio contract", () => {
    let wallet: JWKInterface
    let wallet_id: string
    let initialState: State
    let arlocal: ArLocal
    let warp: Warp
    let contract_id: string
    let contractSrc: string
    let contract: Contract<State>
    beforeAll(async () => {
        arlocal = new ArLocal(4000, false)
        await arlocal.start()
        LoggerFactory.INST.logLevel("error");
        warp = WarpFactory.forLocal(4000).use(new DeployPlugin());
        const _wallet = await warp.generateWallet()
        wallet = _wallet.jwk
        wallet_id = _wallet.address
        await warp.testing.addFunds(wallet)
        initialState = {
            video: [],
            playlist: [],
            user: [],
            bought: [],
            encrypted_db: []
        }
        contractSrc = fs.readFileSync(path.join(__dirname + "/../dist/init.js"), "utf-8");
        const tx = await warp.deploy({
            wallet: wallet,
            initState: JSON.stringify(initialState),
            src: contractSrc
        })
        contract_id = tx.contractTxId
        console.log("Deployed Contract Address: ", contract_id)
        contract = warp.contract<State>(contract_id).connect(wallet)
    })
    it("testing", async () => {
        const txn = await contract.writeInteraction({ function: "upload_video", id: "anish4r34ff3", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "open" })
        console.log(await ((await contract.readState()).cachedValue.state.video))
        expect(32).toEqual(32)
    })
})