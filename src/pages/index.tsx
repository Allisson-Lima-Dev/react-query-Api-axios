import React, { useState, useEffect } from 'react'
import ReactQuery from '~/components/reactQuery/ReactQuery'
import SemQuery from '~/components/reactQuery/SemReactQuery'
import Test from '../components/reactQuery/test'
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

    const { data } = await axios.get("https://reqres.in/api/users", { params: { per_page: 3, page: pageUser } });

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
    <Flex
      textAlign="center"
      flexDir="column"
      align="center"
      mt="100px"
    >
      <Heading>Paginação com API usando React Query</Heading>
      <Heading color="red.300">Página {pageUser}</Heading>
      <Flex
        flexDir="row"
        justifyContent="center"
        align="center"
      >
        {
          users.map((user) => {
            return (
              <Box
                key={user.id}>
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

      </Flex>
      {/* <Heading>com Query</Heading>
      <ReactQuery/>
      <Heading my="50px">Sem Query</Heading>
      <SemQuery/> */}
      <Flex
        mt="50px">
        <Button
          onClick={() => setPageUser(prev => prev - 1)}
          disabled={pageUser === 1}
          mr="80px"
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
          Próximo
        </Button>
      </Flex>
    </Flex>

  )
}


