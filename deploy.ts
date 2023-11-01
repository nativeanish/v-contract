import { WarpFactory } from "warp-contracts";
import { readFileSync } from "fs";
import { ArweaveSigner, DeployPlugin } from "warp-contracts-plugin-deploy";
const contractSrc = readFileSync("./dist/init.js", "utf-8");
const stateSrc = readFileSync("./dist/init.json", "utf-8");
// Sc03k9lGDCove17se7FUPbGaV1lRxdCwuboAVwU6AlM
async function run() {

    const warp = WarpFactory.forTestnet().use(new DeployPlugin());
    const wallet = await warp.generateWallet();
    await warp.testing.addFunds(wallet.jwk)
    const txN = await warp.deploy({
        wallet: new ArweaveSigner(wallet.jwk),
        src: contractSrc,
        initState: stateSrc,
    });
    console.log(txN.contractTxId);
}

run()
    .then(() => console.log("Worked"))
    .catch((data) => console.log(data));
