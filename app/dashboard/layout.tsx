import { Metadata } from "next";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "crm | dashboard",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full  ">
      <Navbar />
      {children}
    </main>
  );
}
