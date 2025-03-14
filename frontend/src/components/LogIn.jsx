// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../Pages/Navbar";
// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Input,
//   Spinner,
//   Text,
//   keyframes,
//   useToast,
// } from "@chakra-ui/react";
// import { useDispatch, useSelector, useStore } from "react-redux";
// import { loginFetch } from "../Redux/UserReducer/action";
// import { Link, useNavigate } from "react-router-dom";
// import { showToast } from "./SignUp";

// const Login = () => {
//   const emailInput = useRef(null);
//   const backgroundRef = useRef(null);
//   const emailbox = useRef(null);
//   const passwordInput = useRef(null);
//   const passwordbox = useRef(null);
//   const [form, setForm] = useState({ email: "", password: "" });

//   const userStore = useSelector((store) => store.UserReducer);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const toast = useToast();
//   // will show the input element when click on element
//   function showInput(e) {
//     const ele = e.target.id;
//     if (ele === "email") {
//       emailInput.current.style.display = "block";
//       emailInput.current.focus();
//       emailbox.current.style.padding = "5px 20px";
//     } else if (ele === "password") {
//       passwordInput.current.style.display = "block";
//       passwordInput.current.focus();
//       passwordbox.current.style.padding = "5px 20px";
//     }
//   }

//   // will block the input element when click on backgrond
//   function blockInput(event) {
//     if (event.target === backgroundRef.current && !form.email) {
//       emailInput.current.style.display = "none";
//       emailbox.current.style.padding = "20px";
//     }
//     if (event.target === backgroundRef.current && !form.password) {
//       passwordInput.current.style.display = "none";
//       passwordbox.current.style.padding = "20px";
//     }
//   }

//   // form management

//   function handleInput(e) {
//     const { value, name } = e.target;
//     if (name == "email") {
//       setForm({ ...form, email: value });
//     } else {
//       setForm({ ...form, password: value });
//     }
//   }



//   // login function
//   function handleLogin() {
//     dispatch(loginFetch(form)).then((res) => {
//    const user = JSON.parse(localStorage.getItem('user'))
//       if(user?.message){
//         showToast({toast,message:'Login Successful',color:'green'})
//         setForm({ email: "", password: "" });
//       }else{
//         showToast({toast,message:userStore?.isError,color:'red'})
//       }
      
//     });
//   }


//   useEffect(()=>{
//     // if isAuth is true move to dashboard;

//   if (userStore.isAuth) {
//     if(userStore?.role==='user'){
//       navigate("/learnlink");
//     }else if(userStore?.role == "admin" || userStore?.role=='teacher'){
//       navigate("/admin/dashboard");
//     }
//   }
//   },[userStore?.isAuth,userStore?.role])

//   return (
//     <Box pb='2rem'>
//       <Box>
//         <Navbar />
//       </Box>
//       <Box
//         display="flex"
//         justifyContent="center"
//         pt="100px"
//         onClick={blockInput}
//         ref={backgroundRef}
//       >
//         <Box w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}>
//           <Box mt='15px'>
//             <Heading size="md">Log in to your Learn Link Account</Heading>
//           </Box>
//           {/* 2nd box  */}
//           <Box mt="35px">
//             <Box
//               border="1px solid"
//               p="20px"
//               id="email"
//               m="5px 0"
//               onClick={showInput}
//               ref={emailbox}
//             >
//               <Box>
//                 <Heading id="email" size="xs">
//                   Email
//                 </Heading>
//               </Box>
//               <Box>
//                 <Input
//                   display="none"
//                   ref={emailInput}
//                   border="none"
//                   p="0px"
//                   focusBorderColor="transparent"
//                   _focus={{ outline: "none" }}
//                   name="email"
//                   value={form.email}
//                   onChange={handleInput}
//                 />
//               </Box>
//             </Box>
//             {/* password */}
//             <Box
//               border="1px solid"
//               p="20px"
//               id="password"
//               m="5px 0"
//               onClick={showInput}
//               ref={passwordbox}
//             >
//               <Box>
//                 <Heading id="password" size="xs">
//                   Password
//                 </Heading>
//               </Box>
//               <Box>
//                 <Input
//                   type="password"
//                   display="none"
//                   ref={passwordInput}
//                   border="none"
//                   size="sm"
//                   focusBorderColor="transparent"
//                   _focus={{ outline: "none" }}
//                   name="password"
//                   value={form.password}
//                   onChange={handleInput}
//                 />
//               </Box>
//             </Box>
//             <Box display='flex' m='1rem 0' fontSize='0.7rem'>
//               <Text >You don't have Account with us?</Text>
//               <Link to='/signup'><Text _hover={{}} fontWeight='500' ml='0.5rem' color='black'>SignUp</Text></Link>
//             </Box>
//             {/* button  */}
//             <Box mt="15px">
//               <Button
//                 w="100%"
//                 color="white"
//                 bg="#6D28D9"
//                 _hover={{ background: "#1E88E5", color: "#CFD8DC" }}
//                 borderRadius="0"
//                 textAlign="center"
//                 onClick={handleLogin}
//               >
//                 <Heading size="xs">
//                   {userStore.loading ? <Spinner color="white" /> : "Log in"}
//                 </Heading>
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
  Container,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";

import Navbar from "../Pages/Navbar";
import { loginFetch } from "../Redux/UserReducer/action";
import { showToast } from "./SignUp";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginFetch(formData)).then(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.message) {
        showToast({ toast, message: 'Login Successful', color: 'green' });
        setFormData({ email: "", password: "" });
      } else {
        showToast({ toast, message: 'Login failed', color: 'red' });
      }
    });
  };

  // Redirect based on user role
  useEffect(() => {
    if (userStore.isAuth) {
      if (userStore?.role === 'user') {
        navigate("/learnlink");
      } else if (userStore?.role === "admin" || userStore?.role === 'teacher') {
        navigate("/admin/dashboard");
      }
    }
  }, [userStore?.isAuth, userStore?.role, navigate]);

  return (
    <Box minH="100vh" bg="gray.50" position="relative">
      <Navbar />
      
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)" 
        width={{ base: "90%", md: "80%", lg: "70%" }}
        maxW="1000px"
        boxShadow="xl"
        borderRadius="lg"
        overflow="hidden"
      >
        <Grid templateColumns={{ base: "1fr", md: "5fr 7fr" }}>
          <GridItem display={{ base: "none", md: "block" }} bg="purple.600">
            <Box h="100%" position="relative">
              <Image
                src="/login.jpg"
                alt="Learn Link"
                objectFit="cover"
                h="100%"
                w="100%"
              />
              <Box 
                position="absolute" 
                bottom="0" 
                left="0" 
                p="6" 
                bg="rgba(0,0,0,0.6)" 
                color="white"
                width="100%"
              >
                <Heading size="md">Welcome Back</Heading>
                <Text mt="2" fontSize="sm">Continue your learning journey with Learn Link</Text>
              </Box>
            </Box>
          </GridItem>
          
          <GridItem bg="white" p={{ base: 6, md: 10 }}>
            <VStack spacing={6} align="flex-start" w="full">
              <Heading size="lg">Log in to Learn Link</Heading>
              
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start" w="full">
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      borderRadius="md"
                      size="lg"
                    />
                  </FormControl>
                  
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      borderRadius="md"
                      size="lg"
                    />
                  </FormControl>
                  
                  <Button
                    type="submit"
                    colorScheme="purple"
                    size="lg"
                    w="full"
                    isLoading={userStore.loading}
                    loadingText="Logging in"
                    mt={4}
                  >
                    Log in
                  </Button>
                </VStack>
              </form>
              
              <Flex w="full" justify="center" pt={4}>
                <Text fontSize="sm">Don't have an account?</Text>
                <Link to="/signup">
                  <Text ml={2} fontSize="sm" fontWeight="medium" color="purple.600">
                    Sign up
                  </Text>
                </Link>
              </Flex>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;