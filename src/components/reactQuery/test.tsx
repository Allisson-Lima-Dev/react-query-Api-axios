import React from 'react'
import Image from 'next/image';
import {
    Flex,
    Text,
    FlexProps
} from "@chakra-ui/react";

interface IDataProps extends FlexProps{
    id: string
    email: string
    first_name: string
    last_name: string
    avatar: string
}
export default function ShowUsers({
    id, 
    email, 
    first_name, 
    last_name, 
    avatar, ...rest }: IDataProps){
return(
    <Flex
            {...rest}
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            >
            <Image
            width={220}
            height={220}
            src={avatar} 
            />
            <Text 
            mt="10px" 
            fontSize="19px"
            >
                {first_name} {' '} {last_name} {id}
            </Text>
            <Text 
            mb="20px">
                {email}
            </Text>
        </Flex>
)
}