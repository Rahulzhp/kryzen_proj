import React from 'react'
import "../Styles/Home.css"
import {
  Box,
  Image,
  Text,
  Button
} from "@chakra-ui/react";
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} padding={"75px"} >
        <Box width={"33%"} height={"290px"} margin={"auto"} boxShadow={"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"}>
          <Box>
            <Image width={"105%"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4_ltuG9axJj00jMcOzSzlhj1sNBBzbdR7g&usqp=CAU"}></Image>
          </Box>
          <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"} margin={"auto"} gap={"5px"} marginTop={"35px"}>
            <Text fontSize={"19px"} fontWeight={"semibold"}>Post & Preview Your Data</Text>
            <Link to="/form"><Button colorScheme={"yellow"}>Preview page</Button></Link>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Home