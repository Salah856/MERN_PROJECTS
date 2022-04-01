import React from 'react'
import GoogleMapReact from 'google-map-react'
   

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
} 


const Map = ({ location, zoomLevel=15 }) => (
    
  <div style={{}}>
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
      </GoogleMapReact>
    </div>
  </div>
)

