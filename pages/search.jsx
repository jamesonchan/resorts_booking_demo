import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map'

export default function Search({searchResults}) {

    const router=useRouter()
    const {location, startDate, endDate, numberOfGuest} = router.query


    const formattedStartDate = format(new Date(startDate), 'dd MMM yy')
    const formattedEndDate = format(new Date(endDate), 'dd MMM yy')
    const range = `${formattedStartDate} to ${formattedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numberOfGuest} guests`}/>

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays, from <span className="text-red-400">{range}</span>-<span className="text-red-400">{numberOfGuest}</span> guests</p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden md:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                   
                   <div className="flex-col">
                    {searchResults.map(item=>(
                            <InfoCard key={item.img} {...item}/>
                        ))}
                   </div>
                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={searchResults}/>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export async function getServerSideProps(){
    const searchResults = await fetch('https://links.papareact.com/isz')
        .then(res=>res.json())

    return{
        props:{
            searchResults
        }
    }
}