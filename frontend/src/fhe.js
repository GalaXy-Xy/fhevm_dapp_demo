import { initFhevm, createInstance } from "fhevmjs";

let fheInstance = null;

export async function initFHE(signer) {
  await initFhevm();
  const chainId = await signer.getChainId();
  const publicKey = await signer.provider.send("fhe_getPublicKey", []);
  const signature = await signer.provider.send("fhe_getSignature", [publicKey]);
  fheInstance = await createInstance({ chainId, publicKey, signature, signer });
}

export function encryptValue(value) {
  return fheInstance.encrypt32(value).toString();
}

export async function decryptValue(ciphertext) {
  return await fheInstance.decrypt(ciphertext);
}
