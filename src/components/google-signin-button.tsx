import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
    return (
        <Button
            className="flex items-center gap-2 font-medium"
            onClick={() => { signIn('google', { callbackUrl: '/dashboard/home' }) }}
        >
            <FcGoogle className="text-2xl" />
            Sign in with Google
        </Button>
    );
}
