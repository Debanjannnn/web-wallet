import { Button } from "@/components/ui/button";
import { MnemonicGenerator } from "@/components/ui/MnemonicGenerator";
import App from "next/app";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <MnemonicGenerator />
    </div>
  );
}
