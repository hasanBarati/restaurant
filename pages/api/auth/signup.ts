
import {  PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const prisma=new PrismaClient()
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method ==="POST"){

        const {firstName,lastName,email,phone,city,password}=req.body
        
        const userWithEmail= await prisma.user.findUnique({
            where:{
                email
            }
        })
       
        if(userWithEmail){
            return res.status(400).json({errorMessage:"Emial already is exist"})
        }

        const hashedPasswird= await bcrypt.hash(password,10)
        
        const user=await prisma.user.create({
            data:{
                first_name:firstName,
                last_name:lastName,
                password:hashedPasswird,
                city,
                phone,
                email
            }
        })
      
       const alg="HS256" 
       const secret= new TextEncoder().encode(process.env.JWT_SECRET)
       const token=  await new jose.SignJWT({email:user.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret)
       return res.status(200).json({
            token
        })

    }
} 
