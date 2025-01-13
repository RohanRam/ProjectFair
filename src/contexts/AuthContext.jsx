import React, { createContext, useEffect, useState } from 'react'


export const AuthenticationContext = createContext()


function AuthContext({children}) {

    const [isAuthorized,setIsAuthorized]=useState(false)

    useEffect(() => {
      if(sessionStorage.getItem("token"))
      {
        setIsAuthorized(true)
      }
      else
      {
        setIsAuthorized(false)
      }
    }, [isAuthorized])
    
  return (
    <>
        
       <AuthenticationContext.Provider value={{isAuthorized,setIsAuthorized}}> 
            {children}
       </AuthenticationContext.Provider>

    </>
  )
}

export default AuthContext