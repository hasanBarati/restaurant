import Image from 'next/image'
import Navbar from './components/Navbar'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { Cuisine, Location, PRICE, PrismaClient } from '@prisma/client'

export interface RstaurantCardType{
  id:number
  name:string
  main_image:string,
  cuisine:Cuisine,
  location:Location,
  price:PRICE,
  slug:string
}
const prisma =new PrismaClient()
const fetchRestaurant=async ():Promise<RstaurantCardType[]>=>{
  const restaurants=await prisma.restaurant.findMany({
    select:{
      id:true,
      name:true,
      main_image:true,
      cuisine:true,
      location:true,
      price:true,
      slug:true
    }
  })
  return restaurants
}
export default async function Home() {
  const restaurnats=await fetchRestaurant()
  console.log(restaurnats)
  return (
 

      <main>
    
        <Header/>
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurnats.map((restaurant)=>(
            <RestaurantCard restaurant={restaurant}/>
          ))}
          
        </div>
      </main>
 
  
  )
}
