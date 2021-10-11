import React, { useEffect, useState } from 'react'
import {
    Flex,
    Box,
    Spinner,
    Text
} from '@chakra-ui/react'
import {
    CardPost
} from '~/components'
import axios from 'axios'
import { useQuery } from 'react-query'

function Home() {
    const [users, setUsers] = useState<any[]>([])
    const getUsers = async () => {
        const { data } = await axios.get("https://app-apitest1.herokuapp.com/list_users", { params: { users } });
        setUsers(data.users)
    }
    const { data, isError, isLoading, } = useQuery(["users", { users }], () => getUsers())
    if (isError) {
        return <p>Deu ruim</p>
    }
    if (data || isLoading) {
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
        <Box>
            <Box bg="#4717f6" w="100%" h="50px" color="#fff"> fdfgdfgdfgdfg</Box>
            <Flex
                flexDir="column"
                justify="center"
                align="center"
                bg="#0e0b16"
            >
                {
                    users.map((user, key) => {
                        return (
                            <CardPost
                                my="20px"
                                key={key}
                                name={user.name}
                                email={user.email}
                                descripition={user.descripition}
                            />
                        )
                    })
                }
            </Flex>
        </Box>
    )
}
export default Home
