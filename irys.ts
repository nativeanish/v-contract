import { NodeIrys } from "@irys/sdk"
import { randomBytes } from "crypto"
import fs from "fs"
(async () => {
    const wallet = fs.readFileSync("wallet.json", "utf-8")
    const irys = new NodeIrys({ url: "node2", token: "arweave", key: JSON.parse(wallet) })
    const anchor = randomBytes(16).toString("hex");
    console.log(anchor)
    const data = await irys.upload("testing", { anchor: anchor })
    console.log(data)
})()