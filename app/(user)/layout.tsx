import { auth } from "@/auth";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sesi = await auth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar sesi={sesi} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
