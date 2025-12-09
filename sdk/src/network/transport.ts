export class RpcTransport {
    constructor(private endpoint: string) {}

    async post(path: string, body: any) {
        const res = await fetch(`${this.endpoint}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(`RPC Error: ${res.status}`);
        }

        return res.json();
    }
}
