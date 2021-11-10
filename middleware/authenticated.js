export default function ({ app, redirect}) {
    const cookieRes = app.$cookies.get('user-cookie')
      if(cookieRes !== undefined){
        if(cookieRes['loggedIn'] !== undefined && cookieRes.loggedIn == true){
          console.log('Logged')
        }else{
          return redirect('/login')
        }
      }else{
        return redirect('/login')
      }
  }