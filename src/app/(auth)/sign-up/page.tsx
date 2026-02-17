import SignUpCard from "@/features/auth/components/sign-up-card";

import { protectRoute } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await protectRoute();

  if (user) {
    redirect("/");
  }

  return <SignUpCard />;
};

export default SignUpPage;