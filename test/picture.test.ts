import { Contract, JWKInterface, LoggerFactory, Warp, WarpFactory } from "warp-contracts"
import { State } from "../action/types"
import ArLocal from "arlocal"
import fs from "fs"
import path from "path"
import { DeployPlugin } from 'warp-contracts-plugin-deploy';
jest.setTimeout(300000)
describe("Testing the picture.studio contract", () => {
    let wallet: JWKInterface
    let wallet_id: string
    let wallet1: JWKInterface
    let wallet_id1: string
    let initialState: State
    let arlocal: ArLocal
    let warp: Warp
    let contract_id: string
    let contractSrc: string
    let contract: Contract<State>
    let localDb: State = {
        video: [],
        playlist: [],
        user: [],
        bought: [],
        encrypted_db: []
    }
    //video 
    let title = "How to overcome your mistakes"
    let description = "People often describe failure as a teachable moment— a necessary stumble on our way to improvement. But learning from our mistakes isn’t always easy, especially when those failures are demoralizing, overwhelming, or just downright confusing. So what  prevents us from turning our mistakes into mastery? Explore the biggest obstacles of learning from failure, and how to cultivate a growth mindset."
    let thumbnails = "ff89f348f3j4f"
    let tags = ["ted-ed", "mistake"]
    let id = "f8j8fj83jf11"
    let id1 = "j84f8u8f"
    let price_winston = "43453453"

    beforeAll(async () => {
        arlocal = new ArLocal(4000, false)
        await arlocal.start()
        LoggerFactory.INST.logLevel("error");
        warp = WarpFactory.forLocal(4000).use(new DeployPlugin());
        const _wallet = await warp.generateWallet()
        wallet = _wallet.jwk
        wallet_id = _wallet.address
        const _wallet1 = await warp.generateWallet()
        wallet1 = _wallet1.jwk
        wallet_id1 = wallet_id1
        await warp.testing.addFunds(wallet)
        await warp.testing.addFunds(wallet1)
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
    it("testing create_playlist method with wrong access_model", async () => {
        await expect(contract.writeInteraction({ function: "create_playlist", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "opens", id: "fj83jf98j8j3" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"You must select an access model. Open or Exclusive\"")
    })
    it("testing create_playlist method not including price in exclusive access model", async () => {
        await expect(contract.writeInteraction({ function: "create_playlist", title: "A good Cars", description: "marcs", tags: ["marcs", "works"], access_model: "exclusive", id: "fj83jf98j8j3" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"In Exclusive Playlist, You must set the price\"")
    })
    it("testing write_encryption_key method with content_id undefined", async () => {
        await expect(contract.writeInteraction({ function: "write_encryption_key", id: "fjkfj8f3f3" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Some Fields are missing\"")
    })
    it("testing buy method with error type name", async () => {
        await expect(contract.writeInteraction({ function: "buy", id: "fj8jf83fj834", type: "channel" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Unrecognized type called\"")
    })
    it("testing view method with undefined video id", async () => {
        await expect(contract.writeInteraction({ function: "view" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Basic field video id is missing\"")
    })
    it("testing the upload video with wrong access model", async () => {
        await expect(contract.writeInteraction({ function: "upload_video", title: title, description: description, id: id1, tags: tags, thumbnails: thumbnails, access_model: "exclusives", price_winston: price_winston }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Access Model is wrong\"")
    })
    it("testing the upload video with exclusive access model but no winston", async () => {
        await expect(contract.writeInteraction({ function: "upload_video", title: title, description: description, id: id1, tags: tags, thumbnails: thumbnails, access_model: "exclusive" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"In Exclusive Model, you need to set a price\"")
    })
    it("testing buy method with undefined arguments", async () => {
        await expect(contract.writeInteraction({ function: "buy" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Basic Fields like id or type is missing\"")
        await expect(contract.writeInteraction({ function: "buy", id: "afsdfds" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Basic Fields like id or type is missing\"")
        await expect(contract.writeInteraction({ function: "buy", type: "video" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Basic Fields like id or type is missing\"")
    })
    it("testing upload_video with open access", async () => {
        await contract.writeInteraction({ function: "upload_video", title: title, description: description, id: id, tags: tags, thumbnails: thumbnails, access_model: "open" }, { strict: true })
        const data = (await contract.readState()).cachedValue.state.video[0]
        expect(`${data.title} ${data.description} ${data.thumbnails} ${data.tags} ${data.id} ${data.access_model} ${data.creator} ${data.payment_address} ${data.views} ${data.playlist}`).toEqual(`${title} ${description} ${thumbnails} ${tags} ${id} open ${wallet_id} ${null} 0 ${null}`)
    })
    it("testing get_video with unknown id", async () => {
        const data = await contract.viewState({ function: "get_video", id: "f8j8fj83jf" })
        expect(data.result).toEqual({ success: false, data: "No Video Found" })
    })
    it("testing get_video with known id", async () => {
        //@ts-ignore
        const data = (await contract.viewState({ function: "get_video", id: id })).result.data
        expect(`${data.title} ${data.description} ${data.thumbnails} ${data.tags} ${data.id} ${data.access_model} ${data.creator} ${data.payment_address} ${data.views} ${data.playlist}`).toEqual(`${title} ${description} ${thumbnails} ${tags} ${id} open ${wallet_id} ${null} 0 ${null}`)
    })
    it("testing upload_video with exlcusive access", async () => {
        await contract.writeInteraction({ function: "upload_video", title: title, description: description, id: id1, tags: tags, thumbnails: thumbnails, access_model: "exclusive", price_winston: price_winston }, { strict: true })
        const data = (await contract.readState()).cachedValue.state.video[1]
        expect(`${data.title} ${data.description} ${data.thumbnails} ${data.tags} ${data.id} ${data.access_model} ${data.creator} ${data.payment_address} ${data.views} ${data.playlist} ${data.price_winston}`).toEqual(`${title} ${description} ${thumbnails} ${tags} ${id1} exclusive ${wallet_id} ${wallet_id} 0 ${null} ${price_winston}`)
    })
    it("testing get_video with known id with exlcusive rights", async () => {
        //@ts-ignore
        const data = (await contract.viewState({ function: "get_video", id: id1 })).result.data
        expect(`${data.title} ${data.description} ${data.thumbnails} ${data.tags} ${data.id} ${data.access_model} ${data.creator} ${data.payment_address} ${data.views} ${data.playlist} ${data.price_winston}`).toEqual(`${title} ${description} ${thumbnails} ${tags} ${id1} exclusive ${wallet_id} ${wallet_id} 0 ${null} ${price_winston}`)
    })
    it("testing views method to increase views on vidoes with undefined id", async () => {
        await expect(contract.writeInteraction({ function: "view" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Basic field video id is missing\"")
    })
    it("testing view method to increase views on video with known id", async () => {
        await contract.writeInteraction({ function: "view", id: id }, { strict: true })
        await contract.writeInteraction({ function: "view", id: id }, { strict: true })
        await contract.writeInteraction({ function: "view", id: id1 }, { strict: true })
        await contract.writeInteraction({ function: "view", id: id1 }, { strict: true })
        await contract.writeInteraction({ function: "view", id: id1 }, { strict: true })
        //@ts-ignore 
        const data = (await contract.viewState({ function: "get_video", id: id })).result.data
        //@ts-ignore
        const data1 = (await contract.viewState({ function: "get_video", id: id1 })).result.data
        expect(data.views).toEqual(2)
        expect(data1.views).toEqual(3)
    })
    it("testing buy method with undefined video id and playlist id", async () => {
        await expect(contract.writeInteraction({ function: "buy", id: "fjk453534fj8f3f3", type: "video" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Video is not present\"")
        await expect(contract.writeInteraction({ function: "buy", id: "fjk453534fj8f3f3", type: "playlist" }, { strict: true })).rejects.toThrow("Cannot create interaction: \"Playlist is not present\"")
    })
    it("testing buy method on open access video", async () => {
        const contract1 = warp.contract(contract_id).connect(wallet1)
        const data = (await contract1.dryWrite({ function: "buy", type: "video", id: id, target: wallet_id, qty: price_winston }, wallet_id))
        expect(data?.errorMessage).toEqual("You don't need to buy this content. It is Free/Open Access")
    })
    it("testing buy method", async () => {
        const contract1 = warp.contract(contract_id).connect(wallet1)
        await warp.arweave.api.get(`/mint/${wallet_id1}/100000000000000000`)
        const data = (await contract1.dryWrite({ function: "buy", type: "video", id: id1, target: wallet_id, qty: Number(price_winston) }, wallet_id1))
        await contr
    })
    afterAll(async () => {
        await arlocal.stop()
    })
})