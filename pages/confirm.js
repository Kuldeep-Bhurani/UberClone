import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import Map from './components/Map'
import { useRouter } from 'next/router'

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
            <ConfirmContainer>
                Choose A Location
            </ConfirmContainer>
        </Wrapper>
    )
}

export default confirm

const Wrapper = tw.div`
    h-screen flex flex-col
`

const ConfirmContainer = tw.div`
    flex-1
`