import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {

} from '~/components'
import {
  Flex,
  Box,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import axios from "axios";

interface IFormInputs {
  name: string
  email: string
  descripition: string
}

const schema = yup.object({
  name: yup.string().required("Preencha seu nome"),
  email: yup.string().required("Preencha seu trabalho"),
  descripition: yup.string().required("Preencha seu trabalho"),
}).required();
export default function App() {
  const { register,  handleSubmit, formState: { errors, isSubmitted, isValidating } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => axios.post("https://app-apitest1.herokuapp.com/create_user", data)
  .then(()=>{
    console.log("deu certooooooooooo")
  }).catch(()=>{
    console.log("deu errado")
  })

  
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  return (
    <Box>
      <Flex
        w="100%"
        h="50px"
        bg="#1A9994"
      ></Flex>
      <Flex
        bg="#212c4e"
        h="100vh"
        justify="center"
        align="center"
      >
        <Flex
          bg="#1A9994"
          w="30%"
          p="30px"
          align="center"
          justify="center"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "90%", color: "#d1eae9" }}>
            <label> Nome
              <Input
                mb="15px"
                mt="7px"
                {...register("name")}
              />
            </label>
            <p
              style={{ color: 'red' }}>
              {errors.name?.message}
            </p>
            <label> Email
              <Input
                mb="15px"
                mt="7px"
                {...register("email")}
              />
            </label>
            <p
              style={{ color: 'red' }}
            >{errors.email?.message}
            </p>
            <label> Descrição
              <Input
                mb="15px"
                mt="7px"
                {...register("descripition")}
              />
            </label>
            <p
              style={{ color: 'red' }}
            >{errors.descripition?.message}
            </p>

            {/* <Button
            type="submit"
            bg="#4974a5"
            color="#fff"
            w="100%"
            >
    Submit
  </Button> */}
            <Button
              type="submit"
              bg="#4974a5"
              color="#fff"
              w="100%"
              disabled={errors.name && errors.email? true:false}
              onClick={() =>
                isSubmitted ?
                toast({
                  title: "Usuário criado com sucesso.",
                  description: "We've created your account for you.",
                  status:"success",
                  duration: 9000,
                  isClosable: true,
                }) :
                toast({
                  title: "An error occurred.",
                  description: "Unable to create user account.",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                })
              }
            >
              Salvar
            </Button>


          </form>
        </Flex>
      </Flex>
    </Box>
  );
}