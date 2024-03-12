import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from "next/headers";
import AuthButtonServer from "@/app/components/auth-button-server";
import {redirect} from "next/navigation";
import withAuth from "@/app/hoc/withAuth";

async function Home() {
  const supabase = createServerComponentClient({cookies})
    const {data:{session}} = await supabase.auth.getSession();
  const {data:tweets} = await supabase.from('tweets')
  return (
      <>
        <AuthButtonServer/>
        <pre>
          {
            JSON.stringify(tweets, null, 2)
          }
        </pre>
      </>
  );
}

export default withAuth(Home)
