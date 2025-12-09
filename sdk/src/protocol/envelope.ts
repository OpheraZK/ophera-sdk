import { PaymentRequest } from "./paymentRequest";

export class X402Envelope {
    constructor(public request: PaymentRequest) {}

    toBytes(): Uint8Array {
        return Buffer.from(this.request.serialize(), "utf8");
    }
}
