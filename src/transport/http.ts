import axios from "axios";

export class HttpTransport {
    constructor(
        private readonly endpoint: string,
        private readonly apiKey?: string
    ) {}

    private headers() {
        return this.apiKey
            ? { "x-ophera-key": this.apiKey }
            : {};
    }

    async get(path: string) {
        return axios.get(this.endpoint + path, {
            headers: this.headers()
        });
    }

    async post(path: string, body: any) {
        return axios.post(this.endpoint + path, body, {
            headers: this.headers()
        });
    }
}
