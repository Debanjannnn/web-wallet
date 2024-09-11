import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./button";

interface SolanaWalletProps {
    mnemonic: string;
}

export const SolanaWallet: React.FC<SolanaWalletProps> = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<string[]>([]);

    const addWallet = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const keypair = Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
            setCurrentIndex(prevIndex => prevIndex + 1);
            setPublicKeys(prevKeys => [...prevKeys, keypair.publicKey.toBase58()]);
        } catch (error) {
            console.error('Error generating wallet:', error);
        }
    };

    return (
        <div >
            <Button 
                onClick={addWallet} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Add SOL wallet
            </Button>

            <div className="mt-4">
                {publicKeys.map((publicKey, index) => (
                    <div key={index} >
                        {publicKey}
                    </div>
                ))}
            </div>
        </div>
    );
};
