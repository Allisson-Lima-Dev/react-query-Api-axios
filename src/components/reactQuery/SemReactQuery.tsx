import React, { useState, useEffect } from 'react'
import {
    Flex,
    Text,
    Image,
    Button
} from "@chakra-ui/react";

export interface IData {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

async function getUser(id: number) {
    const request = await fetch(`https://reqres.in/api/users/${id}?delay=1`)

    const response = await request.json()

    if (!request.ok) {
        throw new Error(response.error)
    }
    return response.data as IData
}

export default function TestReactQuery() {
    const [currentUserId, setCurrentUserId] = useState(1)
    const [user, setUser] = useState<IData>()
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {

        setLoading(true)
        getUser(currentUserId)
            .then((response) => {
                setUser(response)
                setLoading(false)
            })
            .catch(() => {
                setIsError(true)
                setLoading(false)
            })
    }, [currentUserId])

    if (isError) {
        return <p>Deu ruim</p>
    }
    if (!user || loading) {
        return (
            <Flex
                alignItems="center"
                justifyContent="center">
                <Text>
                    Loading...
                </Text>
            </Flex>
        )
    }

    return (
        <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center">
            <Image src={user.avatar} />
            <Text mt="10px" fontSize="19px">
                {user.first_name} {' '} {user.last_name}
            </Text>
            <Text mb="20px">
                {user.email}
            </Text>
            <Flex mb="50px">
                <Button onClick={() => setCurrentUserId(prev => prev - 1)}>
                    Prev
                </Button>
                <Button
                    onClick={() => setCurrentUserId(next => next + 1)}
                >Next</Button>
            </Flex>
        </Flex>
    )
}

