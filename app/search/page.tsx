import React from 'react'
import Navbar from '../components/Navbar'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'

interface SearchPrams {city?:string,cuisine?:string,price?:PRICE}

const prisma=new  PrismaClient
const select={
  id:true,
  name:true,
  main_image:true,
  price:true,
  cuisine:true,
  location:true,
  slug:true,
  reviews:true
}
const fetchRestaurantByCity=(searchParams:SearchPrams)=>{
  const where:any={}
  if(searchParams.city){
    const location={
      name:{
        equals:searchParams.city.toLocaleLowerCase()
      }
    }
    where.location=location
  }
  if(searchParams.cuisine){
    const cuisine={
      name:{
        equals:searchParams.cuisine.toLocaleLowerCase()
      }
    }
    where.cuisine=cuisine
  }
  if(searchParams.price){
    const price={
        equals:searchParams.price
    }
    where.price=price
  }

  return prisma.restaurant.findMany({
    where,
    select:select
  })

}

const fetchLocations=async ()=>{
  return prisma.location.findMany()
}

const fetchCuisine=async ()=>{
  return prisma.cuisine.findMany() 
}
export default async function Search({searchParams}:{searchParams:SearchPrams}) {
    const restaurants=await fetchRestaurantByCity(searchParams)
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
