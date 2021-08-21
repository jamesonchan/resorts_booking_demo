import ReactMapGL,{Marker, Popup} from 'react-map-gl'
import { useState } from 'react'
import { getCenter } from 'geolib/'

export default function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults.map(result=>({
        longitude:result.long,
        latitude:result.lat
    }))

    const center = getCenter(coordinates)
    
    const [viewport, setViewport] = useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8

    })

    return (
       <ReactMapGL
            mapStyle="mapbox://styles/jamesonchan/cksjuwuy300ep18qyceg3onvg"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(viewport)=>setViewport(viewport)}
       >    
            {/* Marker */}
           {searchResults.map(result=>(
               <div key={result.long}>
                   <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetLeft={-10}
                   >
                    <p 
                        onClick={()=>setSelectedLocation(result)} 
                        className="text-red-400 text-2xl cursor-pointer animate-bounce"
                        aria-label="push-pin"
                    >⚑</p>
                   </Marker>

                   {/* popup */}
                   {selectedLocation.long === result.long && (
                       <Popup
                        onClose={()=>setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                       >
                          {result.title}
                       </Popup>
                   )}
                </div>
           ))}

       </ReactMapGL>
    )
}
