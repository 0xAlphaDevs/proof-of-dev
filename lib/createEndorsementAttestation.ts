import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";

export async function createEndorsementAttestation(
  data?: any,
  indexingValue?: string
) {
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
  });

  // Create attestation
  const createAttestationRes = await client.createAttestation({
    schemaId: "0x260",
    data: {
      skill: "c",
      rating: 3,
      description: "b",
      endorseTo: "0x1b7B2f6fdd75D8721AA1E227d58fe97577Cd5571",
      endorsedBy: "0x5C4185b8cCA5198a94bF2B97569DEb2bbAF1f50C",
    },
    recipients: ["0x1b7B2f6fdd75D8721AA1E227d58fe97577Cd5571"],
    indexingValue: "0x1b7B2f6fdd75D8721AA1E227d58fe97577Cd5571",
  });

  console.log(createAttestationRes);
}
