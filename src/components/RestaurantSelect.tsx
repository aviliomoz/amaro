import { ArrowLeft, ChevronDown, LoaderCircle } from "lucide-react";
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
    <div className="flex items-center relative">
      <span className="mr-4 font-extralight text-2xl text-stone-300">/</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 mr-2 border rounded-md bg-stone-50 px-4 py-1.5 text-sm font-medium text-stone-900 hover:bg-stone-100"
      >
        <p className="truncate max-w-20 sm:max-w-96 flex items-center gap-2 text-sm">{restaurant.name}</p>
        {/* <span className="text-[10px] font-bold tracking-wider text-orange-500">PRO</span> */}
        <ChevronDown className="size-4 ml-1" />
      </button>
      {isOpen && <ul ref={dropdownRef} className="absolute bg-white border rounded-md p-3 top-full text-sm left-6 mt-2 z-50 w-52 flex flex-col gap-1 shadow-lg">
        <h4 className="font-semibold">Tus restaurantes:</h4>
        {restaurants.map((res) => (
          <li key={res.id}>
            <a
              href={`/restaurants/${res.slug}/dashboard`}
              className={`block px-3 py-1 rounded-md hover:bg-stone-100 ${res.id === restaurant.id ? "font-bold bg-stone-100" : ""}`}
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
