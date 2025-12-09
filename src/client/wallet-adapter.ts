import { Keypair, Connection } from "@solana/web3.js";

export class WalletAdapter {
    private keypair: Keypair;

    constructor(secret?: Uint8Array) {
        this.keypair = secret ? Keypair.fromSecretKey(secret) : Keypair.generate();
    }

    get publicKey() {
        return this.keypair.publicKey;
    }

    sign(message: Uint8Array): Uint8Array {
        return this.keypair.sign(message);
    }

    async airdrop(connection: Connection, lamports = 1_000_000) {
        const sig = await connection.requestAirdrop(this.publicKey, lamports);
        await connection.confirmTransaction(sig);
    }
}
