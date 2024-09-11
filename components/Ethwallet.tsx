import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Button } from "./ui/button";

interface EthWalletProps {
  mnemonic: string;
}

export const EthWallet: React.FC<EthWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div>
      <Button onClick={handleAddWallet} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
        Add ETH wallet
      </Button>

      {addresses.map((address, index) => (
        <div key={index}>
          Eth - {address}
        </div>
      ))}
    </div>
  );
};
