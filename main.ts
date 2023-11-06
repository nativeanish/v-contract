import Arweave from "arweave"

(async () => {
    const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https'
    })
    const data = await arweave.transactions.get("NtVtqAvRQ5UM0YJtfXM0W5Thy2Zj248N4moq4gTvFcY")
    console.log(data)
})()