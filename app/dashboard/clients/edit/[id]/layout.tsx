import { Metadata } from "next";

export const metadata: Metadata = {
  title: "crm | edit",
};

export default function AddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full my-5 px-5 ">{children}</main>;
}



