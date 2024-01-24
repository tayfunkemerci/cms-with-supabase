import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // if user is signed in and the current path is / redirect the user to /account
    if (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // if user is not signed in and the current path is not / redirect the user to /
    if (!user && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/account'],
}

/*

Burada, bir isteği alıp bir yanıt oluşturan ve ardından bu isteği ve yanıtı,
'auth-helpers-nextjs' paketimizden gelen "createMiddlewareClient" işlevine iletici bu
middleware işlevini dışa aktarmak istiyoruz.

Şimdi, uygulamamızda giriş yaptığımızda, kullanıcının oturumu için bir çerez ayarlanır.
Bu oturum süresi dolunca, middleware işlevimiz oturumu arka planda yeniler.
Kullanıcının oturumu kapatılması gereken tek zaman, çıkış düğmesine tıkladıkları zamandır.

*/
