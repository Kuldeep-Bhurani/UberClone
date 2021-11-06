import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import Map from './components/Map'
import { useRouter } from 'next/router'
import RideSelector from './components/RideSelector'

const confirm = () => {
    const router = useRouter()
    const { pickLoc, dropLoc } = router.query

    const [PickCords, setPickCords] = useState();
    const [DropCords, setDropCords] = useState();

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
            <Map PickCords={PickCords} DropCords={DropCords} />
            <RideContainer>
                <RideSelector />
                <ConfirmBtnContainer>
                    <ConfirmBtn>
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

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`

const ConfirmBtnContainer = tw.div`
    border-t-2
`

const ConfirmBtn = tw.div`
    bg-black text-white mx-4 my-4 py-4 text-center text-xl cursor-pointer
`