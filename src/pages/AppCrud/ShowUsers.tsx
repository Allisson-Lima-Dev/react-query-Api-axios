import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { 
  CardProfile 
} from '~/components'
import {
  Flex,
  Box,
  Text,
  Heading,
  Spinner,
  Button, 
} from '@chakra-ui/react'
import axios from 'axios'

export default function Home() {

  const [users, setUsers] = useState<any[]>([]);
  const [pageUser, setPageUser] = useState(1)
  const [numbUsers, setNumbUsers] = useState<any>(2)
  const [pagesTotal, setPagesTotal] = useState<any>()
  const valeuPage = (pagesTotal / numbUsers)

  const getUsers = async () => {

    const { data } = await axios.get("https://reqres.in/api/users", { params: { per_page: numbUsers, page: pageUser,  } });
    setPagesTotal(data.total)
    console.log(data.total)
    console.log(data.data)
    setUsers(data.data);
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
      <Heading>Paginação com API usando React Query/Axios</Heading>
      <Heading color="red.300">Página {pageUser}</Heading>
      <Flex
        flexDir={['column','column','row','row']}
        justifyContent="center"
        align="center"
      >
        {
          users.map((user) => {
            return (
              <Box
                key={user.id}>
                <CardProfile
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
      <Flex
        mt="50px"
        mb="50px"
        >
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
          disabled={pageUser >= valeuPage }
          bg="green"
          color="#fff"
        >
          Próximo
        </Button>
      </Flex>
    </Flex>

  )
}


