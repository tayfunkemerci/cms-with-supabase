/*
* withAuth  adında bir HOC("Higher Order Component") oluşturduk.
* Bu HOC, oturum kontrolünü gerçekleştirir.
* Eğer oturum yoksa  /login  sayfasına yönlendirir.
* Ayrıca, eğer oturum varsa, sarmaladığı bileşeni ( WrappedComponent ) render eder.
* */
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation';
import {cookies} from "next/headers"; // Router kütüphanenizi buraya ekleyin
const withAuth = (WrappedComponent) => {
    return async (props) => {
        const supabase = createServerComponentClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            redirect('/login');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;