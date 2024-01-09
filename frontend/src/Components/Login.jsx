import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box
} from '@chakra-ui/react';

const Login = () => {
    return (
        <div>
            <Box h={"530px"}>
                <Alert status='error' marginTop={"31px"} height={"51px"}>
                    <AlertIcon />
                    <AlertTitle>You Have loged Out!</AlertTitle>
                    <AlertDescription>Please Login To visit this Page.</AlertDescription>
                </Alert>
            </Box>
        </div>
    )
}

export default Login