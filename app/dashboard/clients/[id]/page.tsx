
import Client from "./_components/Client";

export default async function CliengtPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const {id} = await params;
  


  return (
    <main className="w-full   grid gap-5  px-5">
        <Client id={id} />
    </main>
  );
}
