import Image from 'next/image'
import { useState } from 'react'

import {
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon
    
} from '@heroicons/react/solid'
// calender
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css filee
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';



export default function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [numberOfGuest, setNumberOfGuest] = useState(1)
    const router = useRouter()

    const selectionRange = {
        startDate,
        endDate,
        key:'selection'
    }

    const handleSelect = (ranges)=>{
        
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const search = ()=>{
        router.push({
            pathname:'/search',
            query:{
                location:searchInput,
                startDate:startDate.toISOString(),
                endDate:endDate.toISOString(),
                numberOfGuest

            }
        })
    }
    
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

            {/* left */}
            <div onClick={()=>router.push("/")} className="relative flex items-center h-10 my-auoto cursor-pointer">
                <Image 
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* middle - search*/}
            <div className="flex items-center md:border-2 md:shadow-sm rounded-full py-2">

                <input 
                    value={searchInput}
                    onChange={(e)=>setSearchInput(e.target.value)} 
                    type="text" 
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" 
                    placeholder={placeholder || "Start your search" }
                />

                <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2"/>
            </div>

            {/* right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>

                <div className="flex border-2 items-center rounded-full p-2 space-x-2 ">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>

            {/* calender */}
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-3">
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect}
                    />
                    {/* guests */}
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guest</h2>
                        <UsersIcon className="h-5"/>
                        <input 
                            value={numberOfGuest}
                            onChange={(e)=>setNumberOfGuest(e.target.value)}
                            min={1}
                            type="number" 
                            className="w-12 pl-2 text-lg outline-none text-red-400"
                        />
                    </div>
                    {/* search and cancel */}
                    <div className="flex">
                        <button className="flex-grow text-gray-500" onClick={()=>setSearchInput('')}>Cancel</button>
                        <button className="flex-grow text-red-400" onClick={search}>Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}
