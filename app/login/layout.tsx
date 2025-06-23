import { Metadata } from "next";


export const metadata: Metadata = {
  title: "crm | login",
};


export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full h-full">{children}</main>;
}
