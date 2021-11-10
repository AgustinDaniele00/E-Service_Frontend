export default function ({ app, redirect}) {
    const cookieRes = app.$cookies.get('user-cookie')
      if(cookieRes !== undefined && cookieRes['loggedIn'] !== undefined && cookieRes.loggedIn == true){
        redirect('/')
      }
  }