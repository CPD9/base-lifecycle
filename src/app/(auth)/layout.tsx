"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";
  return (
    <main className=" bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
        <Image src="/logo.svg" alt="logo" width={152} height={56} />
        <Button variant="secondary" asChild>
          <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </Button>
      </nav>
      <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
        {children}
      </div>
    </div>
  </main>
  );
};

export default AuthLayout;