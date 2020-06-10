import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"

const projection = geoEqualEarth()
  .scale(160)
  .translate([ 800 / 2, 450 / 2 ])

const WorldMap = (props) => {
  const {users, fill} = props;
  const [geographies, setGeographies] = useState([])

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          setGeographies(feature(worlddata, worlddata.objects.countries).features)
        })
      })
  }, [])

  return (
    <svg width='100%' height='90%' viewBox="0 0 1000 1000">
      <g className="countries" style={{transform: 'translateX(100px)'}}>
        {
          geographies.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ geoPath().projection(projection)(d) }
              className="country"
              fill={ `rgba(0,0,0,${ 1 / geographies.length * i})` }
              stroke="#FFFFFF"
              strokeWidth={ 0.5 }
            />
          ))
        }
      </g>
      <g className="markers" style={{transform: 'translateX(100px)'}}>
        {
          users.map((user, i) => (
            <circle
              key={ `marker-${i}` }
              cx={ projection(user.coordinates)[0] }
              cy={ projection(user.coordinates)[1] }
              r={3}
              fill={fill[user.provider]}
              stroke="#FFFFFF"
              className="marker"
            />
          ))
        }
      </g>
    </svg>
  )
}

export default WorldMap
