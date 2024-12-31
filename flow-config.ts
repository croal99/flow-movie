// import { config } from '@onflow/fcl';

// config({
// 	'accessNode.api': 'https://rest-mainnet.onflow.org',
// 	'flow.network': 'mainnet',
// 	'discovery.wallet': 'https://fcl-discovery.onflow.org/authn',
// });

import * as fcl from "@onflow/fcl";

// FCL Configuration
fcl.config({
	"flow.network": "local",
	"accessNode.api": "http://localhost:8888", // Flow Emulator
	"discovery.wallet": "http://localhost:8701/fcl/authn", // Local Wallet Discovery
});
// fcl.config({
// 	"flow.network": "testnet",
// 	"accessNode.api": "https://rest-testnet.onflow.org",
// 	"discovery.wallet": "https://fcl-discovery.onflow.org/authn",
// });
