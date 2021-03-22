import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

// solves 'loading...' bug from in user-profile component if user not logged in.
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // user not logged in
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

export default ProfilePage;
