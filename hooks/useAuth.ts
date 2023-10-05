import axios from 'axios'
import React from 'react'

const UseAuth=()=> {
    
    const signIn=async({email,password}:{email:string,password:string})=>{
       try{
        await axios.post("http://localhost:3000/api/auth/signin",{
            email,
            password
        })
       }catch(error){

       }

    }

   return {
     signIn
   }
}

export default UseAuth