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

import { states } from "country-cities";
import { cities } from "country-cities";
import defaultImg from "../Images/defaultImg.jpeg";
import Imagecart from "./Imagecart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import GuestUser from "../Images/Guest-user.png"

const FormData_Cont = () => {
    const pdfref = useRef()
    const toast = useToast();
    const token = "jjb"
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const dummy = [1, 2, 3, 4];

    const [allState, setallState] = useState([]);
    const [allCity, setallcity] = useState([]);
    const [age, setAge] = useState(0)
    const [isoState, setisoState] = useState("");
    const [finalState, setfinalState] = useState("");
    const [displayImage, setdisplayImage] = useState([
        defaultImg,
        defaultImg,
    ]);

    const [selectedImage, setSelectedImage] = useState([]);
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [finalCity, setfinalCity] = useState("");

    const user = "rahul"

    useEffect(() => {
        const state = states.getByCountry("IN");
        //console.log(state);
        const city = cities.getByState(state[0].isoCode, "IN");
        //console.log(city);
        setallState(state);
        setallcity(city);
    }, []);

    useEffect(() => {
        const city = cities.getByState(isoState, "IN");
        //console.log(city);
        setallcity(city);
    }, [isoState]);


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
        formData.append('name', title);
        formData.append('age', age);
        formData.append('city', finalCity);
        formData.append('address', description);
        formData.append('userId', "");

        for (let i = 0; i < selectedImage.length; i++) {
            formData.append('photos', selectedImage[i].pics);
        }


        axios.post(`http://localhost:8080/crdential/add`, formData, {
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTlhZWFiMzcyODY3ZWIxMDJhMjAzMWEiLCJpYXQiOjE3MDQ3Mjg3Mzh9.KyGzP9GLgjRqSMOXod6uStmWCwSVb00Tq4S6gp75Dqg"
            }
        })
            .then((res) => {
                console.log("details", res);
                toast({
                    title: "Your Post Will Live Soon.",
                    status: "success",
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
        <Box padding={"20px"} height={"1000px"}>
            <Flex gap={"50px"}>
                <Box width={"40%"} height={"400px"}>
                    <Text fontSize={"19px"} textAlign={"left"} mb={"20px"}>
                        Product Name
                    </Text>
                    <Input
                        placeholder="Enter product name"
                        onChange={(el) => settitle(el.target.value)}
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
                    <Text fontSize={"19px"} textAlign={"left"} mb={"20px"}>
                        Age
                    </Text>
                    <Input
                        placeholder="Enter Your Age"
                        onChange={(el) => setAge(el.target.value)}
                        borderBottom={"1px solid grey"}
                        variant={"flushed"}
                    />
                    <Text fontSize={"19px"} textAlign={"left"} m={"20px 0px"}>
                        Address
                    </Text>
                    <Textarea
                        placeholder="Description"
                        onChange={(el) => setdescription(el.target.value)}
                        border={"1px solid grey"}
                        height={"100px"}
                        resize={"none"}
                    />
                    <Text fontSize={"19px"} textAlign={"left"} m={"20px 0px"}>
                        Select State
                    </Text>
                    <Select
                        onChange={(el) => {
                            setisoState(el.target.value.split(":")[0]);
                            setfinalState(el.target.value.split(":")[1]);
                            console.log(el.target.value);
                        }}
                    >
                        <option value={""} hidden>
                            Select State
                        </option>
                        {allState.map((id) => {
                            return (
                                <option value={`${id.isoCode}:${id.name}`}>{id.name}</option>
                            );
                        })}
                    </Select>

                    <Text fontSize={"19px"} textAlign={"left"} m={"20px 0px"}>
                        Select City
                    </Text>
                    <Select
                        isDisabled={isoState == ""}
                        onChange={(el) => {
                            setfinalCity(el.target.value);
                        }}
                    >
                        <option value={""} hidden>
                            Select City
                        </option>
                        {allCity.map((id) => {
                            return <option value={id.name}>{id.name}</option>;
                        })}
                    </Select>

                    <Button onClick={handlePostData} mt={"20px"}>
                        Submit
                    </Button>
                </Box>

                <Box width={"30%"} margin={"auto"} ref={pdfref}>
                    <Text textAlign={"left"} fontWeight={"Bold"} fontSize={"18px"}>Images</Text>
                    <Box h={"300px"}>
                        <Slider {...settings}>
                            {displayImage.map((ele) => {
                                return <Image src={ele} height={"300px"} />;
                            })}
                        </Slider></Box>
                    <Flex mt={"40px"} gap={"5px"}>
                        <Text fontWeight={"Bold"} fontSize={"18px"}>Product Name:</Text>
                        <Text textAlign={"left"}>{title}</Text>
                    </Flex>
                    <Flex gap={"5px"} mt={"40px"}>
                        <Text fontWeight={"Bold"} fontSize={"18px"}>Description:</Text>
                        <Text textAlign={"left"}>{description}</Text>
                    </Flex>
                    <Flex gap={"5px"} mt={"40px"}>
                        <Text fontWeight={"Bold"} fontSize={"18px"} >Location:</Text>
                        <Text>{finalState},{finalCity}</Text>
                    </Flex>
                    <Flex textAlign={"left"} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"} borderRadius={"15px"} mt={"20px"}>
                        <Image src={GuestUser} h={"50px"} />
                        <Flex flexDirection={"column"}>
                            <Text fontWeight={"Bold"} fontSize={"18px"}>{user.name}</Text>
                            <Text fontWeight={"Bold"} fontSize={"18px"}>Location:</Text>
                        </Flex>

                    </Flex>
                    <Box>
                        <Button onClick={downloadpdf}>Download Pdf</Button>
                    </Box>
                </Box>

            </Flex>

        </Box>
    )
}

export default FormData_Cont