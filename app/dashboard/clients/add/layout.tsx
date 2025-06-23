import { Metadata } from "next";

export const metadata: Metadata = {
  title: "crm | add",
};

export default function AddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full my-5 px-5 ">{children}</main>;
}



