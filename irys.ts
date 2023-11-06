import { NodeIrys } from "@irys/sdk"
import { randomBytes } from "crypto"
import axios from "axios"
import fs from "fs"
(async () => {
    const wallet = fs.readFileSync("wallet.json", "utf-8")
    const irys = new NodeIrys({ url: "node2", token: "arweave", key: JSON.parse(wallet) })
    // const anchor = randomBytes(16).toString("hex");
    // console.log(anchor)
    // const data = await irys.upload("testing", { anchor: anchor })
    // console.log(data)
    // const data = await fetch(`https://node2.irys.xyz/${`JzLQ-elNsEce6r-B55R4IPiIgVoKKSQmCniT8a1DJ-c}`}`)
    const d = 'A6A2M0NhGlaPd3dSS2-b7SYyplYT3UHoIjKTvLiP290'
    const data3 = await axios.get(`https://gateway.irys.xyz/${d}`, { maxRedirects: 4 })
    console.log(data3.data)
})()
//data = JzLQ-elNsEce6r-B55R4IPiIgVoKKSQmCniT8a1DJ-c