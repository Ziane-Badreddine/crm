import FormEdit from "./_components/FormEdit";

export default async function AddPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="w-full md:w-1/2 p-5 mx-auto bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Client</h1>
        <p className="text-muted-foreground text-sm">
          Update the client’s information and save the changes.
        </p>
      </div>
      <FormEdit clientId={id} />
    </main>
  );
}
