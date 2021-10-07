import React from 'react'
import {
    Box,
    Flex,
    Button
} from '@chakra-ui/react'
import { 
    Input
} from '~/components'
import { useForm } from 'react-hook-form'

export const Form = () => {
    const { register, handleSubmit, formState: { errors }} = useForm()
    return (
        <>
            
        </>
    )
}
