import { WarpFactory } from "warp-contracts";
import { readFileSync } from "fs";
import { ArweaveSigner, DeployPlugin } from "warp-contracts-plugin-deploy";
const contractSrc = readFileSync("./dist/init.js", "utf-8");
const stateSrc = readFileSync("./dist/init.json", "utf-8");
// Sc03k9lGDCove17se7FUPbGaV1lRxdCwuboAVwU6AlM
async function run() {

    const warp = WarpFactory.forTestnet();
    const wallet = await warp.generateWallet();
    await warp.testing.addFunds(wallet.jwk)
    // const txN = await warp.deploy({
    //     wallet: new ArweaveSigner(wallet.jwk),
    //     src: contractSrc,
    //     initState: stateSrc,
    // });
    // console.log(txN.contractTxId);
    const contract = warp.contract("AAWTKFw_qVUniDQgS-5Uy9-yvxDBiYBve41640sVXFQ").connect(wallet.jwk)
    // try {
    //     await contract.writeInteraction({ function: "upload_video", title: "There is a Car", description: "there was a car", tags: ["markon", "assel"], access_model: "open", id: "jhasjhjh89f83fr" })
    // } catch (err) {
    //     console.log("Something is eroor")
    //     console.log(err)
    // }
    console.log(await (contract.readState()))
}

run()
    .then(() => console.log("Worked"))
    .catch((data) => console.log(data));
