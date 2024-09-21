import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";

export async function createEndorsementAttestation(
  skill: string,
  rating: number,
  description: string,
  endorseTo: string,
  endorsedBy: string
) {
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
  });

  // Create attestation
  const createAttestationRes = await client.createAttestation({
    schemaId: "0x260",
    data: {
      skill: skill,
      rating: rating,
      description: description,
      endorseTo: endorseTo,
      endorsedBy: endorsedBy,
    },
    recipients: [endorseTo],
    indexingValue: endorseTo,
  });

  console.log(createAttestationRes);
  if (createAttestationRes.attestationId) {
    return { status: true, attestationId: createAttestationRes.attestationId };
  } else {
    return { status: false };
  }
}
