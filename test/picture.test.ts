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
    it("testing undefined method called", async () => {
        await expect(contract.writeInteraction({ function: "unknown method", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "open" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Undefined Method Called\"")
    })
    it("testing upload_video method with one undefined basic fields", async () => {
        await expect(contract.writeInteraction({ function: "upload_video", title: "A good Cars", description: "marcs", tags: ["marcs", "works"] }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Some Basics Field is Missing\"")
    })
    it("testing upload_video method with one undefined playlist", async () => {
        await expect(contract.writeInteraction({ function: "upload_video", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], id: "fadfsdfsdfsd", playlist: "f8j3jf83f34" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Playlist doesn't exits\"")
    })
    it("testing upload_video method with access model undefined", async () => {
        await expect(contract.writeInteraction({ function: "upload_video", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], id: "fadfsdfsdfsd" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Access Model is not Defined\"")
    })
    it("testing create_playlist method with one undefined basic fields", async () => {
        await expect(contract.writeInteraction({ function: "create_playlist", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "open" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Some basic fields are missing\"")
    })
    it("testing create_playlist method with error access_model", async () => {
        await expect(contract.writeInteraction({ function: "create_playlist", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "opens", id: "fj83jf98j8j3" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"You must select an access model. Open or Exclusive\"")
    })
    it("testing create_playlist method not including price in exclusive access model", async () => {
        await expect(contract.writeInteraction({ function: "create_playlist", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "exclusive", id: "fj83jf98j8j3" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"In Exclusive Playlist, You must set the price\"")
    })

})