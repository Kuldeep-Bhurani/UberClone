import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import Map from './components/Map'
import { useRouter } from 'next/router'
import Link from 'next/link'
import RideSelector from './components/RideSelector'

const confirm = () => {
    const router = useRouter()
    const { pickLoc, dropLoc } = router.query

    const [PickCords, setPickCords] = useState([0, 0]);
    const [DropCords, setDropCords] = useState([0, 0]);

    const getPickupCords = (pick) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pick}.json?` +
            new URLSearchParams({
                access_token: "pk.eyJ1Ijoia3VsZGVlcGJodXJhbmkiLCJhIjoiY2t2bmd4cXBwOXEzazJuczd1ZW9nOTFscSJ9.4d_mX6aZFZId46jRsc_3jA",
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                setPickCords(data.features[0].center);
            })
    }

    const getDropCords = (drop) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${drop}.json?` +
            new URLSearchParams({
                access_token: "pk.eyJ1Ijoia3VsZGVlcGJodXJhbmkiLCJhIjoiY2t2bmd4cXBwOXEzazJuczd1ZW9nOTFscSJ9.4d_mX6aZFZId46jRsc_3jA",
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                setDropCords(data.features[0].center);
            })
    }

    useEffect(() => {
        getPickupCords(pickLoc);
        getDropCords(dropLoc);
    }, [pickLoc, dropLoc])

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/search">
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
            </ButtonContainer>
            <Map PickCords={PickCords} DropCords={DropCords} />
            <RideContainer>
                <RideSelector PickCords={PickCords} DropCords={DropCords} />
                <ConfirmBtnContainer>
                    <ConfirmBtn onClick={() => { alert("Car Booked") }}>
                        Confirm
                    </ConfirmBtn>
                </ConfirmBtnContainer>
            </RideContainer>
        </Wrapper>
    )
}

export default confirm

const Wrapper = tw.div`
    h-screen flex flex-col
`

const ButtonContainer = tw.div`
    rounded-full absolute top-4 left-4 bg-white cursor-pointer z-10 shadow-md
`

const BackButton = tw.img`
    h-full object-contain
`

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`

const ConfirmBtnContainer = tw.div`
    border-t-2 flex
`

const ConfirmBtn = tw.button`
    flex-1 bg-black text-white mx-4 my-4 py-4 text-center text-xl cursor-pointer
`