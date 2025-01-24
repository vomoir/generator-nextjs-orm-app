import Link from "next/link";
import { ContactForm } from "./components/contact-form";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 border-2 rounded-md p-6">
      <ContactForm />
      <Link
        className="text-center underline font-semibold text-lg"
        href="/responses"
      >
        View responses
      </Link>
    </div>
  );
}
