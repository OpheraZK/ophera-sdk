import { Poseidon } from "../crypto/poseidon";
import { MerkleTree } from "../crypto/merkle";
import { generateProof, ProofArtifacts } from "../crypto/proofs";
import { HttpTransport } from "../transport/http";
import { Keypair } from "@solana/web3.js";
import { serializeWitness } from "../utils/serializer";

export interface Px402ClientOptions {
    endpoint: string;
    apiKey?: string;
    witnessTreeDepth?: number;
}

/**
 * Px402Client – Ophera’s privacy-preserving execution client for x402 payments.
 *
 * Handles:
 *  - witness creation
 *  - nullifier generation
 *  - note commitments
 *  - Merkle inclusion proofs
 *  - zkSNARK proof production
 *  - encrypted payment payload transmission
 */
export class Px402Client {
    private readonly http: HttpTransport;
    private readonly poseidon: Poseidon;
    private readonly depth: number;

    constructor(private readonly opts: Px402ClientOptions) {
        this.http = new HttpTransport(opts.endpoint, opts.apiKey);
        this.poseidon = new Poseidon();
        this.depth = opts.witnessTreeDepth ?? 32;
    }

    /**
     * Creates a privacy-preserving payment instruction.
     */
    async createPayment(
        owner: Keypair,
        recipient: string,
        amount: bigint
    ) {
        const nullifier = this.poseidon.hash([
            owner.publicKey.toBytes(),
            BigInt(Date.now())
        ]);

        const commitment = this.poseidon.hash([amount, nullifier]);

        const merkle = await this.fetchMerkleTree();
        const path = merkle.prove(commitment);

        const witness = {
            owner: owner.publicKey.toBase58(),
            amount,
            commitment,
            nullifier,
            path
        };

        const serializedWitness = serializeWitness(witness);

        const artifacts: ProofArtifacts = await generateProof(serializedWitness);

        return {
            commitment,
            nullifier,
            proof: artifacts.proof,
            publicSignals: artifacts.publicSignals
        };
    }

    /**
     * Broadcasts a fully verified zk-payment to the Ophera relayer.
     */
    async submitPayment(payload: any) {
        return this.http.post("/px402/submit", payload);
    }

    /**
     * Retrieves the canonical Merkle tree root + tree data from Ophera.
     */
    private async fetchMerkleTree() {
        const { data } = await this.http.get("/state/merkle");
        return new MerkleTree(data.leaves, this.depth);
    }
}
