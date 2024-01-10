import React from 'react';
import { Box, Icon, Image, Input } from '@chakra-ui/react';
import { MdClose } from "react-icons/md";
import defaultImg from "../Images/defaultImg.jpeg";


const Imagecart = ({ handleImageUpload, pos, displayImage, handleDeleteImage }) => {
    const fileID = `fileInput${pos}`
    return (
        <Box>
            <Input
                id={fileID}
                display={"none"}
                type="file"
                onChange={(event) => handleImageUpload(event, pos)}
                name="myFile"
            />
            <label htmlFor={fileID}>
                <Box cursor="pointer" position="relative">
                    <Image
                        src={displayImage[pos]}
                        alt="Default Image"
                        w="100%"
                        objectFit="cover"
                    />
                    <Box
                        hidden={
                            displayImage[pos] === defaultImg
                                ? true
                                : false
                        }
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        position="absolute"
                        top="5px"
                        right="5px"
                        width="20px"
                        height="20px"
                        borderRadius="50%"
                        backgroundColor="white"
                    >
                        <Icon
                            opacity={"1"}
                            pointerEvents="auto"
                            onClick={(e) => handleDeleteImage(e, pos)}
                            as={MdClose}
                            color="red"
                            cursor="pointer"
                        />
                    </Box>
                </Box>
            </label>
        </Box>
    )
}

export default Imagecart