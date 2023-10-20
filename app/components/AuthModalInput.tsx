import React from 'react'

interface Props {
    inputs:{
        firstName:string,
        lastName:string,
        email:string,
        phone:string,
        city:string,
        password:string
      }
    handleChangeInput:(e:React.ChangeEvent<HTMLInputElement>)=>void
    isSignIn:boolean
}
export default function AuthModalInput({inputs,handleChangeInput,isSignIn}:Props) {
 
    return (
        <>
        {!isSignIn ?  <div className='my-3 flex justify-between text-sm'>
                <input type="text" onChange={handleChangeInput} name="firstName" value={inputs.firstName}  className='rounded border p-2 py-3 w-[49%]' placeholder='First Name'/>
                <input type="text" onChange={handleChangeInput} name="lastName" value={inputs.lastName}  className='rounded border p-2 py-3 w-[49%]' placeholder='Last Name'/>
            </div> :null}
         
            <div className='my-3 flex justify-between text-sm'>
                <input type="text" onChange={handleChangeInput} name="email" value={inputs.email} className='rounded border p-2 py-3 w-full' placeholder='Email'/>
            </div>
            {!isSignIn ? 
             <div className='my-3 flex justify-between text-sm'>
             <input type="text" onChange={handleChangeInput} name="phone" value={inputs.phone} className='rounded border p-2 py-3 w-[49%]' placeholder='Phone'/>
             <input type="text" onChange={handleChangeInput} name="city" value={inputs.city} className='rounded border p-2 py-3 w-[49%]' placeholder='City'/>
         </div>
            :null}
           
            <div className='my-3 flex justify-between text-sm'>
                <input type="password" onChange={handleChangeInput} name="password" value={inputs.password}  className='rounded border p-2 py-3 w-full' placeholder='Password'/>
            </div>

        </>
    )
}
