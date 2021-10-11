import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    Button,
    BoxProps
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaUserAlt, FaRegEdit, FaRegEnvelope } from "react-icons/fa";

interface IUsers extends BoxProps{
    name: string
    email: string
    descripition: string
}
export function CardPost({
    name,
    email,
    descripition,
    ...rest
}: IUsers) {
    return (
        <Flex
            flexDir="column"
            bg="#4717f6"
            border="5px solid #a239ca"
            w="30%"
            borderRightRadius="50px"
            borderTopLeftRadius="50px"
            {...rest}
        >
            <Box
                bg="#fff"
                w="100%"
                h="60px"
                borderTopLeftRadius="50px"
                borderTopRightRadius="50px"
                textAlign="center"
            >
                <Heading
                    m="10px"
                    color="#4717f6"
                >
                    Dados do usuário
                </Heading>
            </Box>
            <Flex 
            color="#fff"
            flexDir="column"
            mt="10px"
            ml="50px"
            >
                <Text
                fontSize="20px">
                    Nome:
                </Text>
                <Flex  
                mb="10px"
                mt="5px"
                alignItems="center">
                    <FaUserAlt size="25px" />
                    <Text 
                    ml="10px">
                         {' '} {name}
                    </Text>
                </Flex>
                <Text
                fontSize="20px">
                    Email:
                </Text>
                
                <Flex 
                mb="10px"
                mt="5px"
                alignItems="center"> 
                <FaRegEnvelope size="30px"/>
                    <Text
                    ml="10px">
                     {' '}
                        {email}
                    </Text>
                </Flex>
                <Text
                fontSize="20px">
                    Descrição:
                </Text>
                <Flex 
                mb="15px"
                mt="5px"
                alignItems="center">
                    <FaRegEdit size="30px"/> 
                    <Text
                    ml="10px">
                    {' '}
                        {descripition}
                    </Text>
                </Flex>
            </Flex>
            <Flex
            w="90%"
            m="auto"
            mb="20px"
            justify="center"
            >
                <Button
                bg="green.500"
                color="#fff"
                mr="50px"
                >
                    <Link href="/AppCrud/EditUser"> 
                    Editar
                    </Link>
                </Button>
                <Button
                bg="red"
                color="#fff">
                    Deletar
                </Button>
            </Flex>
        </Flex>
    )
}


