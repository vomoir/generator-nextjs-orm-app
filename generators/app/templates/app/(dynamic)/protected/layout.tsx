import { ReactNode } from "react";
import SessionProvider from "@/src/components/session-provider";
import { auth } from "@/src/auth";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <div>{children}</div>
        </SessionProvider>
    );
}