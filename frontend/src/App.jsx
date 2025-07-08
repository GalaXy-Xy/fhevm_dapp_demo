import { useState } from 'react';
import { ethers } from 'ethers';
import { initFHE, encryptValue, decryptValue } from './fhe';

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const abi = [
  "function storeEncrypted(bytes calldata encryptedValue) external",
  "function retrieveEncrypted() external view returns (bytes memory)"
];

function App() {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [input, setInput] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signerObj = await provider.getSigner();
    setSigner(signerObj);
    await initFHE(signerObj);
    const contractObj = new ethers.Contract(contractAddress, abi, signerObj);
    setContract(contractObj);
  };

  const sendEncrypted = async () => {
    const encrypted = encryptValue(Number(input));
    await contract.storeEncrypted(encrypted);
  };

  const getDecrypted = async () => {
    const encrypted = await contract.retrieveEncrypted();
    const plaintext = await decryptValue(encrypted);
    setDecrypted(plaintext);
  };

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendEncrypted}>Send Encrypted</button>
      <button onClick={getDecrypted}>Get Decrypted</button>
      <p>Decrypted Value: {decrypted}</p>
    </div>
  );
}

export default App;
