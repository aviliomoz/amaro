import { ArrowLeft, Box, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useRestaurant } from "../contexts/RestaurantContext";
import { useEffect, useRef, useState } from "react";
import { axiosAPI } from "../libs/axios";
import { APIResponse, RestaurantType } from "../utils/types";
import { useAuth } from "../contexts/AuthContext";

export const RestaurantSelect = () => {

  const { user } = useAuth()
  const { restaurant } = useRestaurant()
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data: userRestaurants } = await axiosAPI.get<APIResponse<RestaurantType[]>>(`/restaurants?user_id=${user?.id}`)
      setRestaurants(userRestaurants.data)
    }

    fetchRestaurants()

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!restaurant) return <LoaderCircle className='size-4 animate-spin stroke-orange-500' />

  return (
    <div className="flex items-center relative text-sm gap-2 font-medium">
      <Box className="size-3.5 stroke-stone-500" />
      <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2">{restaurant.name}</p>
      <span className="border border-stone-300 rounded-full px-3 py-0.5 text-xs text-stone-500">Pro</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-md p-1 text-sm font-medium text-stone-900 hover:bg-stone-100 border border-transparent hover:border hover:border-stone-300"
      >

        {/* <span className="text-[10px] font-bold tracking-wider text-orange-500">PRO</span> */}
        <ChevronsUpDown className="size-3.5 stroke-stone-500" />
      </button>
      {isOpen && <ul ref={dropdownRef} className="absolute bg-white border rounded-md p-2 top-full text-sm left-6 mt-2 z-50 w-44 flex flex-col gap-0.5 shadow-lg">
        <h4 className="font-medium border-b pb-2 mb-1">Tus restaurantes:</h4>
        {restaurants.map((res) => (
          <li key={res.id}>
            <a
              href={`/restaurants/${res.slug}/dashboard`}
              className={`block px-2 py-0.5 rounded-md hover:bg-stone-100 truncate font-normal ${res.id === restaurant.id ? "font-semibold bg-stone-100" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {res.name}
            </a>
          </li>
        ))}
        <div className="border-b my-1"></div>
        <a href="/restaurants" className="px-3 py-1 rounded-md hover:bg-stone-100 flex items-center gap-2"><ArrowLeft className="size-4" />Volver al inicio</a>
      </ul>}
    </div>
  );
};
