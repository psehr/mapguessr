import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Dot from "./components/Dot";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MapGuessr",
  description: "A game about guessing osu! beatmaps from their background",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="absolute top-0 right-0 bottom-0 left-0 w-screen h-screen flex flex-col"
    >
      <body className={inter.className + "w-full h-full relative"}>
        <Providers>
          <div className="absolute w-full h-16 flex flex-row bg-black/20 drop-shadow-lg">
            <Nav></Nav>
          </div>
          <div className="pt-8 w-full h-full flex flex-col bg-gradient-to-br from-c-darker-blue via-c-darker to-c-darker-blue bg-repeat">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
