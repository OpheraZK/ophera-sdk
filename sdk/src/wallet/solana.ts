import nacl from "tweetnacl";
import bs58 from "bs58";

export class SolanaSigner {
    constructor(private secretKey: Uint8Array) {}

    async signEnvelope(env: { toBytes(): Uint8Array }) {
        const msg = env.toBytes();
        const sig = nacl.sign.detached(msg, this.secretKey);

        return {
            msg: Buffer.from(msg).toString("base64"),
            sig: bs58.encode(sig)
        };
    }
}
