import { redirect } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";
import { protectRoute } from "@/features/auth/actions";

export default async function Home() {
  const user = await protectRoute();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <UserButton />
    </div>
  );
}
