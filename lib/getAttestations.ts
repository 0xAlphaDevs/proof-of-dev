import {
  IndexService,
  SignProtocolClient,
  SpMode,
  EvmChains,
  decodeOnChainData,
} from "@ethsign/sp-sdk";

export async function getAttestationsForUser() {
  const indexService = new IndexService("testnet");
  const res = await indexService.queryAttestationList({
    schemaId: "onchain_evm_11155111_0x260",
    mode: "onchain",
    indexingValue: "",
    page: 1,
  });
  console.log(res);

  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
  });

  let decodedAttestations = [];
  const attestationPromises = res?.rows.map(async (attestation) => {
    return client.getAttestation(attestation.attestationId);
  });

  decodedAttestations = await Promise.all(attestationPromises);
  console.log(decodedAttestations);

  return decodedAttestations;
}

export async function getAttestation(attestationId: string) {
  const indexService = new IndexService("testnet");
  const res = await indexService.queryAttestation(attestationId);
  console.log(res);
}
