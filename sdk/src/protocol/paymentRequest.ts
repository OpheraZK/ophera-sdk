export interface PaymentRequestParams {
    amount: bigint;
    asset: string;
    memo?: string;
    timestamp: number;
}

export class PaymentRequest {
    amount: bigint;
    asset: string;
    memo?: string;
    timestamp: number;

    constructor(p: PaymentRequestParams) {
        this.amount = p.amount;
        this.asset = p.asset;
        this.memo = p.memo;
        this.timestamp = p.timestamp;
    }

    serialize() {
        return JSON.stringify({
            a: this.amount.toString(),
            asset: this.asset,
            memo: this.memo,
            ts: this.timestamp
        });
    }
}
