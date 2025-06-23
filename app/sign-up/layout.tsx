import { Metadata } from "next";


export const metadata: Metadata = {
  title: "crm | signup",
};


export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full h-full">{children}</main>;
}
