import { LoaderCircle } from 'lucide-react'

export const LoadingScreen = () => {
    return <div className="flex justify-center items-center w-full h-screen"><LoaderCircle className='size-6 animate-spin stroke-orange-500' /></div>
}