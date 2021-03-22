import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
function AuthPage() {
  //
  //- TODO MOVE LOGIC TO ServerSideProps
  //
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        // redirect to profile
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
    // return () => {
    //   cleanup
    // }
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return <AuthForm />;
}

export default AuthPage;
