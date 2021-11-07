import React, { useState, useEffect } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { carList } from '../../data/carList'

const RideSelector = ({ PickCords, DropCords }) => {
    const [rideDuration, setRideDuration] = useState(0)
    useEffect(() => {
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${PickCords[0]}, ${PickCords[1]};${DropCords[0]}, ${DropCords[1]}?access_token=pk.eyJ1Ijoia3VsZGVlcGJodXJhbmkiLCJhIjoiY2t2bmd4cXBwOXEzazJuczd1ZW9nOTFscSJ9.4d_mX6aZFZId46jRsc_3jA`)
            .then(res => res.json())
            .then(data => {
                setRideDuration(data.routes[0].duration / 100)
            })
    }, [PickCords, DropCords])
    return (
        <Wrapper>
            <Title>
                Choose a ride, or swipe up for more
            </Title>
            <CarList>
                {carList.map((car, index) => (
                    <Car key={index} >
                        <CarImg src={car.imgUrl} />
                        <CarDetails>
                            <Service>
                                {car.service}
                            </Service>
                            <Time>
                                5 min away
                            </Time>
                        </CarDetails>
                        <CarPrice>
                            {(rideDuration * car.multiplier).toFixed(2) + "rs"}
                        </CarPrice>
                    </Car>
                ))}
            </CarList>
        </Wrapper >
    )
}

export default RideSelector

const Wrapper = tw.div`
    flex-1 overflow-hidden flex flex-col
`

const Title = tw.div`
    text-gray-500 text-center text-sm py-2 border-b
`

const CarList = tw.div`
    overflow-y-scroll
`

const Car = tw.div`
    flex p-4 items-center
`

const CarImg = tw.img`
    h-14 mr-4
`

const CarDetails = tw.div`
    flex-1
`

const CarPrice = tw.div`
    text-medium
`

const Time = tw.div`
    text-blue-500 text-sm
`

const Service = tw.div`
    font-medium
`