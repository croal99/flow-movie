import * as fcl from "@onflow/fcl";
const env = import.meta.env;

// FCL Configuration
// fcl.config({
// 	"flow.network": "local",
// 	"accessNode.api": "http://localhost:8888", // Flow Emulator
// 	"discovery.wallet": "http://localhost:8701/fcl/authn", // Local Wallet Discovery
// });
// fcl.config({
// 	"flow.network": "testnet",
// 	"accessNode.api": "https://rest-testnet.onflow.org",
// 	"discovery.wallet": "https://fcl-discovery.onflow.org/authn",
// });
console.log(env.VITE_FLOW_NETWORK);
fcl.config({
	"flow.network": env.VITE_FLOW_NETWORK,
	"accessNode.api": "https://rest-testnet.onflow.org",
	"discovery.wallet": "https://fcl-discovery.onflow.org/authn",
});
