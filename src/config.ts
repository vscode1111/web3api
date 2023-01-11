const env = process.env;

export const config = Object.freeze({
  production: Boolean(env.PRODUCTION?.toLowerCase() === "true"),
  port: Number(env.PORT || 3001),
  providerUrl: env.PROVIDER_URL || "",
  metamaskPrivateKey: env.METAMASK_PRIVATE_KEY || "",
});

function checkConfig() {
  const entries = Object.entries(config);
  for (const entry of entries) {
    if (entry[1] === undefined) {
      throw new Error(`Please set your ${entry[0]} in a .env file`);
    }
  }
}
checkConfig();
