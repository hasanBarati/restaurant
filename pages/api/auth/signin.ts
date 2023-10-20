
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from 'cookies-next';

const prisma=new PrismaClient()
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method ==="POST"){

        const {email,password}=req.body
        
        const user= await prisma.user.findUnique({
            where:{
                email
            }
        })
       
       
        if(!user){
            return res.status(401).json({errorMessage:"Email or password is invalid"})
        }

        const isMatch=await bcrypt.compare(password,user.password as string)
        const hashedPasswird= await bcrypt.hash(password,10)
        
        if(!isMatch){
            return res.status(401)
            .json({errorMessage:"Email or Passwors is invalid"})
        }
        const alg="HS256" 
        const secret= new TextEncoder().encode(process.env.JWT_SECRET)
        const token=  await new jose.SignJWT({email:user.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret)
        setCookie("jwt",token,{res,req,maxAge:60*6*24}) 
        return res.status(200).json({
             firstName:user.first_name,
             lastName:user.last_name,
             email:user.email,
             phone:user.phone,
             city:user.city
         })
    }
} 
