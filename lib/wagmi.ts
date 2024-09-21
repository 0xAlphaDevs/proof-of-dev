import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  ssr: false,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_API_URL),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
