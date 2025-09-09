import { auth } from "@/auth";
import Sidebar_admin from "../components/sidebar_admin";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sesi = await auth();
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Sidebar_admin sesi={sesi}>{children }</Sidebar_admin>
      </main>
    </div>
  );
}
