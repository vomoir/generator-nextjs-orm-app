import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect("/signin");
    }
    return <div>
        <h1>{session.user.name}</h1>
        <p>You are in the <strong>Protected Zone!</strong>
        </p>
    </div>;
}
