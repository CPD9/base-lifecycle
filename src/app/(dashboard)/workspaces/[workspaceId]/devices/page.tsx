import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

const DevicesPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Devices</h1>
      <p className="text-muted-foreground">
        Device view is being prepared. Workspace members and settings come next.
      </p>
    </div>
  );
};

export default DevicesPage;
