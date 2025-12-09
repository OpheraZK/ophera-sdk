# OpheraZK SDK

The official JavaScript/TypeScript SDK for integrating **px402**, Ophera’s privacy-preserving execution layer for x402-based payments.  
This SDK provides all tooling for client-side proof preparation, witness creation, serialization, transaction building, and secure communication with the Ophera network.

Ophera SDK enables developers, agents, and services to build **private, verifiable, programmable payments** without exposing metadata or identity.

---

## Features

### Zero-Knowledge Workflow
- Witness generation + serialization  
- Poseidon hashing primitives  
- Merkle path + Merkle tree utilities  
- BN254 elliptic curve field arithmetic  
- Transcript handling for zk-SNARK proof requests  

### Payment Layer (px402)
- Payment builder API  
- Invoice creation + settlement verification  
- Commitment + nullifier utilities  
- Deterministic serialization for agent execution  
- Request signing and linking  

### Network Transport
- Unified REST client for px402 endpoints  
- Secure JSON payload handling  
- Retry logic + batching support  

### Developer Experience
- Modular architecture  
- Fully typed TypeScript  
- Browser + Node.js support  
- Example scripts included  

---

## Installation

Ophera SDK is distributed as an ES module and supports modern Node.js, bundlers, and edge runtimes.

---

### **NPM**

```bash
npm install ohera-sdk

node -e "console.log(require('ophera-sdk').version)"
```

```js
import { Client } from "ophera-sdk";

const px = new Client({
  endpoint: "https://api.px402.ophera.xyz",
  apiKey: process.env.OPHERA_KEY
});
```

---

### **Yarn**

```bash
yarn add ohera-sdk
```

```js
import { Client } from "ophera-sdk";

const px = new Client({
  endpoint: "https://api.px402.ophera.xyz",
  apiKey: process.env.OPHERA_KEY
});
```

---

### **Bun**

```bash
bun add ohera-sdk
```

```js
import { Client } from "ophera-sdk";

const px = new Client({
  endpoint: "https://api.px402.ophera.xyz",
  apiKey: process.env.OPHERA_KEY
});
```

---

### **PNPM**

```bash
pnpm add ohera-sdk
```

```js
import { Client } from "ophera-sdk";

const px = new Client({
  endpoint: "https://api.px402.ophera.xyz",
  apiKey: process.env.OPHERA_KEY
});
```
