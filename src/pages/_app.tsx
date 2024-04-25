import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layouts from "@/components/organism/Layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full">
      <Layouts>
        <Component {...pageProps} />
      </Layouts>
    </div>
  )
}
