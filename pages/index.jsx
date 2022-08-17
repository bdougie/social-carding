import Hero from "../components/Hero";
import SocialCards from "../components/SocialCards";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Home() {
  const [info, setInfo] = useState(null);
  return (
    <div>
      <Hero info={info} setInfo={setInfo} />
      <SocialCards info={info} setInfo={setInfo} />
    </div>
  );
}
