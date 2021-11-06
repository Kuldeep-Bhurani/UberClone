import React from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { carList } from '../data/carList'

const RideSelector = () => {
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
                            5rs
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