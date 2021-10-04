import React, { useState, useEffect } from 'react'
import ReactQuery from '~/components/reactQuery/ReactQuery'
import SemQuery from '~/components/reactQuery/SemReactQuery'
import Test from '~/components/reactQuery/test'
import { useQuery } from 'react-query'

import {
  Flex,
  Box,
  Text,
  Heading,
  Spinner, 
  Button
} from '@chakra-ui/react'
import axios from 'axios'

export default function Home() {
  
  const [users, setUsers] = useState<any[]>([]);
  const [pageUser, setPageUser] = useState(1)
  const [total, setTotal] = useState()

  const getUsers = async () => {
    
     const { data } = await axios.get("https://reqres.in/api/users", {params: { per_page: 3, page: pageUser }}); 

      console.log(data.data)
      setUsers(data.data);
      setTotal(data.total_pages)
  };
  const { data, isError, isLoading, } = useQuery(["users", pageUser], () => getUsers())
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
  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <Box textAlign="center">
      <Heading>sem Query</Heading>
      <Flex 
      justifyContent="center"
      >
        {
          users.map((user) => {
            return (
              <Box key={user.id}>
                <Test
                  mt="50px"
                  mx="50px"
                  flexDir="row"
                  id={user.id}
                  avatar={user.avatar}
                  email={user.email}
                  first_name={user.first_name}
                  last_name={user.last_name} />
              </Box>
            )
          })}
          <Flex >
                <Button 
                    onClick={() => setPageUser(prev => prev - 1 )}
                    disabled={pageUser === 1}
                    mr="20px"
                    bg="red"
                    color="#fff"
                >
                    Anterior
                </Button>
                <Button
                    onClick={() => setPageUser(next => next + 1)}
                    disabled={pageUser === total}
                    bg="green"
                    color="#fff"
                >
                    {pageUser}
                </Button>
              </Flex>  
      </Flex>
      {/* <Heading>com Query</Heading>
      <ReactQuery/>
      <Heading my="50px">Sem Query</Heading>
      <SemQuery/> */}
    </Box>
   
  )
}


