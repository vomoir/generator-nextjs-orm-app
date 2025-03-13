import { db } from "@/db";
import { ResponseItem } from "@/components/response-item";
import { responses } from "@/db/schemas";
import Link from "next/link";

export default async function ResponsesPage() {
  const resps = await getResponses();

  return (
    <div className="flex flex-col justify-center items-center border-2 gap-5 rounded-md p-6">
      <h1 className="text-3xl font-bold text-center"><%- appTitle %></h1>
      <h2 className="text-2xl font-bold text-center">Responses</h2>
      {resps.length > 0 ? (
        <ul className="space-y-4">
          {resps.map((resp) => (
            <ResponseItem response={resp} key={resp.id} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-4">No responses yet.</p>
      )}
        <div className="text-center underline font-semibold text-lg">
          <Link href="/">Home</Link>          
        </div>
    </div>
  );
}

async function getResponses() {
  return await db.select().from(responses);
}
