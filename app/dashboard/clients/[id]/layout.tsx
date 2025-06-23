import { Metadata } from "next";


export const metadata: Metadata = {
  title: "crm | client",
};

export default function CliensLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full my-5 ">
      {children}
    </main>
  );
}
