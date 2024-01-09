import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Center, Container, Grid, Text, Input, Img, InputGroup, InputLeftElement, Flex, Button, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom"
import "../Styles/Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const navigate = useNavigate();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const UserToken = (localStorage.getItem("Usertoken"))
    const UserName = (localStorage.getItem("Username"))

    const handlelogout = () => {
        localStorage.removeItem('Usertoken');
        window.location.reload();
    }
    const handlesignup = (e) => {
        e.preventDefault()
        if (name && email && password) {

            if (!validateEmail(email)) {
                toast({
                    title: 'Error',
                    description: 'Please enter a valid email address.',
                    status: 'error',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            } else if (password.length < 6 || password.length > 12) {
                toast({
                    title: 'Error',
                    description: 'Password must be between 6 and 12 characters.',
                    status: 'error',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                const user = {
                    name,
                    email,
                    password,
                };
                axios.post('http://localhost:8080/users/register', user)
                    .then((res) => {
                        if (res.data === 'Signup Successfully') {
                            toast({
                                title: 'Account created.',
                                description: 'Successfully Created your Account',
                                status: 'success',
                                position: 'top',
                                duration: 3000,
                                isClosable: true,
                            });
                            setTimeout(() => Login(), 1000)

                        } else {
                            toast({
                                title: 'Error',
                                description: 'Something went wrong',
                                status: 'error',
                                position: 'top',
                                duration: 3000,
                                isClosable: true,
                            });
                        }
                    });
            }

            onClose()
        }
        else {
            toast({
                title: "Error",
                description: "Please Enter all the detail",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    const Login = () => {
        if (!validateEmail(email)) {
            toast({
                title: 'Error',
                description: 'Please enter a valid email address.',
                status: 'error',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        } else if (password.length < 6 || password.length > 12) {
            toast({
                title: 'Error',
                description: 'Password must be between 6 and 12 characters.',
                status: 'error',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        } else {


            const user = {
                email,
                password,
            };
            axios.post("http://localhost:8080/users/login", user)
                .then((res) => {
                    console.log(res)
                    if (res.data.token) {
                        localStorage.setItem("Usertoken", res.data.token);
                        localStorage.setItem("Username", res.data.username);
                        toast({
                            title: `Welcome ${res.data.username}`,
                            description: "Successfully Logged In",
                            status: "success",
                            position: "top",
                            duration: 3000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: "Error",
                            description: "Something went wrong",
                            status: "error",
                            position: "top",
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                })
            // localStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => window.location.reload(), 1000)
        }
    }
    const HandleallLogout = () => {
        localStorage.clear()
        setTimeout(() => window.location.reload(), 300)
        setTimeout(() => onOpen(), 1000)

    }


    const validateEmail = (email) => {
        // Simple email validation using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handlelogin = () => {

        const user = {
            email,
            password,
        };
        axios.post("http://localhost:8080/users/login", user)
            .then((res) => {
                console.log(res)
                if (res.data.token) {
                    localStorage.setItem("Usertoken", res.data.token);

                    toast({
                        title: `Welcome ${res.data.username}`,
                        description: "Successfully Logged In",
                        status: "success",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate("/")
                } else {
                    toast({
                        title: "Error",
                        description: "Wrong Credential",
                        status: "error",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })

        setTimeout(() => window.location.reload(), 1000)
    }
    return (
        <>
            <header id='Navbar'>
                <nav>
                    <Container maxW={{ md: '100%', lg: '100%' }} pt={{ lg: 2 }}>
                        <Grid templateColumns={{ lg: 'repeat(6, 1fr)' }} gap={1} >
                            <Box w={{ lg: '100%' }} h={{ lg: '57px' }} >
                                <Center><Img w={{ lg: "35%" }} pt={{ lg: 1 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSmFMnkE4WWXA5KFrGGohFf8JCBRlk9AluQ&usqp=CAU" alt="logo" /></Center>
                            </Box>
                            <Box w={{ lg: '60%' }} h={{ lg: '50px' }} >
                                <Link to="/"><Center><Text fontSize={{}} color={'#4C4C4C'} pt={{ lg: 3 }}> <b>HOME</b></Text></Center></Link>
                            </Box>

                            <Box w={{ lg: '100%' }} ml={{ lg: '-40%' }} h={{ lg: '50px' }} >
                                <Link to="/form"><Center><Text color={'#4C4C4C'} pt={{ lg: 3 }}> <b>POST & PREVIEW</b></Text></Center></Link>
                            </Box>
                            <Box w={{ lg: '100%' }} h={{ lg: '50px' }} ml={{ lg: '-5%' }} >
                                <InputGroup >
                                    <InputLeftElement paddingTop={"9px"} pointerEvents='none' >
                                        <AiOutlineSearch />
                                    </InputLeftElement>
                                    <Input backgroundColor={"white"} border={'1px solid'} mt={{ lg: 1 }} htmlSize={34} width='auto' placeholder='Find Your Loved One' />
                                </InputGroup>
                            </Box>
                            <Box w={{ lg: '100%' }} h={{ lg: '50px' }} ml={"155px"}>
                                {
                                    UserToken ? <Button onClick={handlelogout} mt={{ lg: 1 }} colorScheme="green" size='md'>
                                        {UserName}/Logout
                                    </Button> : <Button onClick={onOpen} mt={{ lg: 1 }} colorScheme="yellow" size='md'>
                                        Login/Register
                                    </Button>
                                }
                            </Box>
                        </Grid>
                    </Container>
                </nav>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        {
                            UserName ? <ModalHeader>Login</ModalHeader> : <ModalHeader>Create Account</ModalHeader>
                        }

                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            {
                                UserName ? " " : < FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input ref={initialRef} value={name}
                                        onChange={(e) => setName(e.target.value)} borderRadius={"21px"} placeholder='Enter your Name' />
                                </FormControl>
                            }

                            <FormControl isRequired mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input value={email}
                                    onChange={(e) => setEmail(e.target.value)} borderRadius={"21px"} placeholder='Enter your Email' />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input value={password}
                                    onChange={(e) => setPassword(e.target.value)} borderRadius={"21px"} placeholder='Enter your Password' />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            {
                                UserName ? <Button onClick={handlelogin} colorScheme="teal" mr={3}>
                                    Login
                                </Button> : <Button onClick={handlesignup} colorScheme='red' mr={3}>
                                    Signup
                                </Button>
                            }
                            {
                                UserToken ? <Button colorScheme="red" onClick={HandleallLogout}>Signup</Button> : <Button onClick={onClose}>Cancel</Button>
                            }


                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </header>
        </>
    )
}

export default Navbar