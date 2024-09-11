// MnemonicGenerator.tsx
"use client"
import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './Solanawallet';
import { EthWallet } from '../Ethwallet';

interface MnemonicGeneratorProps {}

export const MnemonicGenerator: React.FC<MnemonicGeneratorProps> = () => {
  const [mnemonic, setMnemonic] = useState<string>("");

  const handleGenerateMnemonic = async () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <>
      <input type="text" value={mnemonic} readOnly />
      <button onClick={handleGenerateMnemonic}>
        Create Seed Phrase
      </button>

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </>
  );
};
