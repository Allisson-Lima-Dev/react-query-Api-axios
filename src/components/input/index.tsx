import React, { forwardRef, ForwardRefRenderFunction, useEffect, useRef } from 'react'
import {

    Input as InputChakra,
    InputProps as InputChakraProps
} from '@chakra-ui/react'

interface IInputProps extends InputChakraProps{
    name: string,
    email: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({
    name,
    email,
    ...rest
}, ref) => {
        return (
                <InputChakra 
                {...rest}
                name={name}
                id={name}
                placeholder="Digite seu nome"
                type="text"
                />
    )
}

export const Input = forwardRef(InputBase);
// const nameInputRef = useRef<HTMLInputElement>(null)
// useEffect(() => {
//     nameInputRef.current?.focus()
// }, [])
// return (
//     <Box>
//         <Flex 
//         justify="center"
//         >
//             <Input 
//             ref={nameInputRef}
//             mt="50px"
//             w="50%"
//             placeholder="Digite seu nome"
//             type="text"
//             />
//         </Flex>
//     </Box>

