import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Image from 'next/image';
import {
    Flex,
    Text,
    Button,
    Spinner
} from "@chakra-ui/react";

export interface IData {
    id?: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

async function getUsers(id: number) {
    const request = await fetch(`https://reqres.in/api/users/`)
    console.log(request)
    try {
        const response = await request.json()
        // console.log(response)
        return response.data as IData
        
    } catch (error) {
        console.error(`Deu algo errado ${error}`)
    }
}

function ReactQueryToo() {

    const [currentUserId, setCurrentUserId] = useState(1)
    const { data, isError, isLoading, } = useQuery(["users", currentUserId], () => getUsers(currentUserId))
    if (isError) {
        return <p>Deu ruim</p>
    }
    if (!data || isLoading) {
        return (
            <Flex
                h="100vh"
                alignItems="center"
                justifyContent="center">
                <Text>
                    <Spinner
                        thickness="4px"
                        speed="0.25s"
                        color="blue.500"
                        size="xl" />
                </Text>
            </Flex>
        )
    }
    return (
        <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                width={180}
                height={180}
                src={data.avatar}
            />
            <Text
                mt="10px"
                fontSize="19px"
            >
                {data.first_name} {' '} {data.last_name}
            </Text>
            <Text
                mb="20px"
            >
                {data.email}
            </Text>
            <Flex >
                <Button
                    onClick={() => setCurrentUserId(prev => prev - 1)}
                    disabled={currentUserId === 1}
                    mr="20px"
                    bg="red"
                    color="#fff"
                >
                    Anterior
                </Button>
                <Button
                    onClick={() => setCurrentUserId(next => next + 1)}
                    disabled={currentUserId === 5}
                    bg="green"
                    color="#fff"
                >
                    Próximo
                </Button>
            </Flex>
        </Flex>
    )
}
export default ReactQueryToo
