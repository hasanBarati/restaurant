import { AuthenticationContext } from '@/app/context/AuthContext'
import axios from 'axios'
import React, { useContext } from 'react'

const UseAuth=()=> {
   const {data,error,loading,setAuthState}=useContext(AuthenticationContext)
    const signIn=async({email,password}:{email:string,password:string},handleClose:()=>void)=>{
      setAuthState({
        data:null,
        error:null,
        loading:true
      })
       try{
       const response=await axios.post("http://localhost:3000/api/auth/signin",{
            email,
            password
        })
        setAuthState({
          data:response.data,
          error:null,
          loading:true
        })
        handleClose()
       }catch(error:any){
        console.log(error)
          setAuthState({
            data:null,
            error:error.response.data.errorMessage,
            loading:false
          })
       }

    }
    
    const signUp=async({
      email,
      password,
      firstName,
      lastName,
      city,
      phone

    }:{
      email:string
      ,password:string,
      firstName:string,
      lastName:string,
      city:string,
      phone:string
    },handleClose:()=>void)=>{
      setAuthState({
        data:null,
        error:null,
        loading:true
      })
       try{
       const response=await axios.post("http://localhost:3000/api/auth/signup",{
            email,
            password,
            firstName,
            lastName,
            city,
            phone
        })
        setAuthState({
          data:response.data,
          error:null,
          loading:true
        })
        handleClose()
       }catch(error:any){
        console.log(error)
          setAuthState({
            data:null,
            error:error.response.data.errorMessage,
            loading:false
          })
       }
    }

   return {
     signIn,
     signUp
   }
}

export default UseAuth