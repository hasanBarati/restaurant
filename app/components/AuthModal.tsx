"use client"
import {useState,useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import UseAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({isSignIn}:{isSignIn:boolean}) {
  const {error,data,loading,setAuthState}=useContext(AuthenticationContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabeled,setDisabled]=useState(true)
  const {signIn,signUp} = UseAuth()
  const renderContent=(signinContent:string,signUpContent:string)=>{
    return isSignIn? signinContent: signUpContent
  }
  
  const handleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setInputs({
        ...inputs,
        [e.target.name]:e.target.value
      })
  }

  const [inputs,setInputs]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    city:"",
    password:""
  })

  useEffect(()=>{
    if(isSignIn){
      if(inputs.password && inputs.email){
       return setDisabled(false)
      }
    }
    setDisabled(true)
  },[inputs])

  const handleClick=()=>{
    if(signIn){
      signIn({email:inputs.email,password:inputs.password},handleClose)
    }
    else{
      signUp(inputs,handleClose)
    }
  }

  // console.log("loading is",loading)
  return (
    <div>
       <button
              className={`${isSignIn? "bg-blue-400 text-white":""} border p-1 px-4 rounded mr-3`}
              onClick={handleOpen}
            >
       
             {renderContent("Sign in","sing up")}
            </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading?<div className='flex justify-center p-2'><CircularProgress/></div>:
            <div className="p-2">
              {error?<Alert severity="error">{error}</Alert>:null}
            <div className="uppercase font-bold text-center pb-2 border-b">
               <p className='text-sm'>
                  {renderContent("Sign In","Create Account")}
               </p>
            </div>
            <div className="m-auto">
               <h2 className='text-2xl font-light text-center'>
               {renderContent("Login Your Account","Create Your Account")}
               </h2>
               <AuthModalInput inputs={inputs} handleChangeInput={handleChangeInput} isSignIn={isSignIn}/>
               <button onClick={handleClick} disabled={disabeled} className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'>
               {renderContent("Sign In","Create Account")}
               </button>
            </div>
          </div>
          
          }
       
        </Box>
      </Modal>
    </div>
  );
}