// MnemonicGenerator.tsx
"use client"
import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './Solanawallet';
import { EthWallet } from '../Ethwallet';
import { Button } from './button';

interface MnemonicGeneratorProps { }

export const MnemonicGenerator: React.FC<MnemonicGeneratorProps> = () => {
  const [mnemonic, setMnemonic] = useState<string>("");

  const handleGenerateMnemonic = async () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div >
      <div className='flex justify-center mt-24 text-black'>
        <input type="text" value={mnemonic} />
        <Button onClick={handleGenerateMnemonic}  >
          Create Seed Phrase
        </Button>
        </div>
      <div className='flex flex-col justify-center mt-24 gap-2 items-center'>
      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
      </div>
      
    </div>
  );
};
