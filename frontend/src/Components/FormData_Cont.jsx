import {
    Box,
    Button,
    Flex,
    Grid,
    Icon,
    Image,
    Input,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf"
import defaultImg from "../Images/defaultImg.jpeg";
import Imagecart from "./Imagecart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Login from "./Login";


const FormData_Cont = () => {
    const pdfref = useRef()
    const toast = useToast();
    const UserToken = (localStorage.getItem("Usertoken"))
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const [age, setAge] = useState(null)
    const [displayImage, setdisplayImage] = useState([
        defaultImg,
        defaultImg,
    ]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const user = "rahul"
    const handleImageUpload = (event, pos) => {
        let pics = selectedImage;
        let blob = [...displayImage];
        if (event.target.files[0] !== undefined) {
            pics[selectedImage.length] = {
                pic: event.target.files[0],
                position: pos + 1,
            };
            blob[pos] = URL.createObjectURL(event.target.files[0]);
            setSelectedImage(pics);
            setdisplayImage(blob);
            event.target.value = "";
        }
        //console.log(event, pos);
    };

    const handlePostData = () => {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('address', address);
        formData.append('userId', "");

        for (let i = 0; i < selectedImage.length; i++) {
            formData.append('photos', selectedImage[i].pics);
        }
        axios.post(`https://elegant-crow-smock.cyclic.app/form/add`, formData, {
            headers: {
                'Authorization': UserToken
            }
        })
            .then((res) => {
                console.log("details", res);
                toast({
                    title: "Details Added",
                    description: "Your Details to Database",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleDeleteImage = (e, pos) => {
        e.preventDefault();
        let pics = selectedImage.filter((ele, i) => i !== pos);
        let blob = [...displayImage];
        URL.revokeObjectURL(blob[pos]);
        blob[pos] = defaultImg;
        setSelectedImage(pics);
        setdisplayImage(blob);
    };

    const downloadpdf = () => {
        const input = pdfref.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgx = (pdfWidth - imgWidth * ratio) / 2;
            const imgy = 30
            pdf.addImage(imgData, 'PNG', imgx, imgy, imgWidth * ratio, imgHeight * ratio);
            pdf.save('formData.pdf')
        })
    }
    return (
        <>{
            UserToken ?
                <Box padding={"20px"} margin={"auto"}>
                    <Flex gap={"37px"}>
                        <Box boxShadow={"rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"} padding={"25px"} width={"40%"} height={"auto"}>
                            <Text fontSize={"19px"} fontWeight={"bold"} textAlign={"left"} mb={"20px"}>
                                Name :
                            </Text>
                            <Input
                                placeholder="Enter your name"
                                onChange={(el) => setname(el.target.value)}
                                borderBottom={"1px solid grey"}
                                variant={"flushed"}
                            />
                            <SimpleGrid columns={[1, 2, 4, 4]} gap={"5px"}>
                                <Imagecart
                                    handleImageUpload={handleImageUpload}
                                    handleDeleteImage={handleDeleteImage}
                                    pos={0}
                                    displayImage={displayImage}
                                />
                                <Imagecart
                                    handleImageUpload={handleImageUpload}
                                    handleDeleteImage={handleDeleteImage}
                                    pos={1}
                                    displayImage={displayImage}
                                />

                            </SimpleGrid>
                            <Text fontSize={"19px"} fontWeight={"bold"} textAlign={"left"} mb={"20px"}>
                                Age :
                            </Text>
                            <Input
                                placeholder="Enter Your Age"
                                onChange={(el) => setAge(el.target.value)}
                                borderBottom={"1px solid grey"}
                                variant={"flushed"}
                            />
                            <Text fontSize={"19px"} fontWeight={"bold"} textAlign={"left"} m={"20px 0px"}>
                                Address :
                            </Text>
                            <Textarea
                                placeholder="Enter Your Address"
                                onChange={(el) => setaddress(el.target.value)}
                                border={"1px solid grey"}
                                height={"100px"}

                            />

                            <Button colorScheme={"green"} onClick={handlePostData} mt={"20px"}>
                                Submit
                            </Button>
                        </Box>

                        <Box width={"55%"} padding={"25px"} boxShadow={"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"} border={"1px solid black"} ref={pdfref}>
                            <Box h={"280px"} width={"265px"} margin={"auto"}>
                                <Slider {...settings}>
                                    {displayImage.map((ele) => {
                                        return <Image src={ele} />;
                                    })}
                                </Slider></Box>
                            <Flex mt={"40px"} gap={"43px"} pl={"45px"} fontSize={"18px"}>
                                <Text fontWeight={"Bold"} >Name :</Text>
                                <Text color={"orangered"} fontWeight={"Bold"} textAlign={"left"}>{name}</Text>
                            </Flex>
                            <Flex gap={"59px"} mt={"40px"} pl={"45px"} fontSize={"18px"}>
                                <Text fontWeight={"Bold"} >Age :</Text>
                                <Text color={"orangered"} fontWeight={"Bold"} textAlign={"left"}>{age}</Text>
                            </Flex>
                            <Flex gap={"25px"} mt={"40px"} mb={"17px"} pl={"45px"} fontSize={"18px"}>
                                <Text fontWeight={"Bold"} >Address :</Text>
                                <Text color={"orangered"} fontWeight={"Bold"} textAlign={"left"}>{address}</Text>
                            </Flex>

                            <Box pl={"45px"}>
                                <Button colorScheme={"green"} onClick={downloadpdf}>Download Pdf</Button>
                            </Box>
                        </Box>

                    </Flex>

                </Box> : <Login />}
        </>
    )
}

export default FormData_Cont