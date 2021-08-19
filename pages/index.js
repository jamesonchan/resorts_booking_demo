import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'

export default function Home({exploreData,cardsData}) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">

        {/* SmallCard */}
        <section className="pt-6">
          <h2 className="text-3xl font-semibold pb-5">Explore Nearby</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {/* pull data  */}
             {exploreData?.map(item=>(
            <SmallCard key={item.img} {...item}/>
          ))}
        </div>
        </section>
        
        {/* MediumCard */}
        <section className="pt-6">
          <h2 className="text-3xl font-semibold pb-5">Live Anywhere</h2>
          {/* pull data */}
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(item=>(
              <MediumCard key={item.img} {...item}/>
            ))}
          </div>
        </section>
        
        {/* LargeCard */}
        <LargeCard 
          img="https://links.papareact.com/4cj"
          title="The Greatesr Outdoors"
          description="Wishlists"
          buttonText="Get Inspired"
        />
      </main>
      
      <Footer />

    </div>
  )
}

 {/* fecth data api */}
export async function getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp')
  .then(
    (res)=>res.json()
  )

  const cardsData = await fetch('https://links.papareact.com/zp1')
    .then(
      (res)=>res.json()
    )

  return{
    props:{
      exploreData,
      cardsData
    }
  }
}