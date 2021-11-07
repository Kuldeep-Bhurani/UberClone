import React, { useEffect } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import { useRouter } from 'next/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push("/")
            }
        })
    })

    return (
        <Wrapper>
            <UberLogo src="https://i.ibb.co/n6LWQM4/Post.png" />
            <Title>Log In To Access Your Account</Title>
            <HeadImg src="https://i.ibb.co/CsV9RYZ/login-image.png" />
            <SignInBtn onClick={() => signInWithPopup(auth, provider)}>
                Sign In With Google
            </SignInBtn>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 w-screen p-4
`

const SignInBtn = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full
`

const UberLogo = tw.img`
  h-7 w-auto object-contain self-start
`

const Title = tw.div`
    text-4xl pt-4 text-gray-500
`

const HeadImg = tw.img`
    object-contain w-full
`