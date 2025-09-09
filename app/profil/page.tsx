import { auth } from "@/auth"
import { Suspense } from "react";
import FormProfil from "./form";

export default async function userPage(){
    const sesi = await auth();
    return (
        <div className="h-full w-full bg-slate-200">
          <div className="z-10">
            <div className="mx-auto px-16 py-10 w-full min-h-screen">
              <Suspense fallback={<div>Loading...</div>}>
                <FormProfil user={sesi?.user} />
              </Suspense>
            </div>
          </div>
        </div>
      );
    }