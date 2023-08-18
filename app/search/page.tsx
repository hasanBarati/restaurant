import React from 'react'
import Navbar from '../components/Navbar'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'


const prisma=new  PrismaClient
const select={
  id:true,
  name:true,
  main_image:true,
  price:true,
  cuisine:true,
  location:true,
  slug:true
}
const fetchRestaurantByCity=(city:string | undefined)=>{
  if(!city) return prisma.restaurant.findMany({select})
  return prisma.restaurant.findMany({
    where:{
      location:{
        name:{
          equals : city.toLocaleLowerCase()
        }
      }
    },
    select:select
  })

}

const fetchLocations=async ()=>{
  return prisma.location.findMany()
}

const fetchCuisine=async ()=>{
  return prisma.cuisine.findMany() 
}
export default async function Search({searchParams}:{searchParams:{city?:string,cuisine?:string,price?:PRICE}}) {
    const restaurants=await fetchRestaurantByCity(searchParams.city)
    const location=await fetchLocations()
    const cuisine=await fetchCuisine()
    return (
      <>
         <Header/>
          <div className="flex py-4 m-auto w-2/3 justify-between items-start">
    
             <SearchSideBar locations={location} cuisines={cuisine} searchParams={searchParams}/>
    
            <div className="w-5/6">
              {restaurants.length?
               <>
               {restaurants.map((restaurant,index)=>(
                <RestaurantCard key={index} restaurant={restaurant}/>
               ))}
               </>
              :
              <p>Sorry, we found no restaurants in this area</p>}
            </div>
          </div>
          </>
      
    )
}
