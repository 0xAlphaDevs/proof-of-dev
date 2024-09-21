import {
  IndexService,
  SignProtocolClient,
  SpMode,
  EvmChains,
} from "@ethsign/sp-sdk";

export async function getAttestationsForUser(address: string) {
  const indexService = new IndexService("testnet");
  const res = await indexService.queryAttestationList({
    schemaId: "onchain_evm_11155111_0x260",
    mode: "onchain",
    indexingValue: address,
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
  // @ts-expect-error --- This is a promise array
  decodedAttestations = await Promise.all(attestationPromises);
  console.log(decodedAttestations);

  return decodedAttestations;
}
