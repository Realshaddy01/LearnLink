// import React, { useRef, useState } from "react";
// import Navbar from "../Pages/Navbar";
// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Input,
//   Spinner,
//   Text,
//   Toast,
//   keyframes,
//   useToast,
// } from "@chakra-ui/react";
// import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

// import { useDispatch, useSelector } from "react-redux";

// import { Link, useNavigate } from "react-router-dom";
// import { signUpFetch } from "../Redux/UserReducer/action";
// import { actionsingUpError } from "../Redux/UserReducer/actionType";

// // Sucess Toast
// export const showToast = ({ toast, message, color }) => {
//   toast({
//     position: "top-right",
//     top: "100px",
//     duration: 3000,
//     render: () => (
//       <Box color="white" p={3} bg={color}>
//         {message || 'Something Went Wrong Please Refresh'}
//       </Box>
//     ),
//   });
// };

// const SignUp = () => {
//   const emailInput = useRef(null);
//   const backgroundRef = useRef(null);
//   const emailbox = useRef(null);
//   const passwordInput = useRef(null);
//   const passwordbox = useRef(null);
//   const nameInput = useRef(null);
//   const namebox = useRef(null);
//   const confirmPasswordInput = useRef(null);
//   const confirmPasswordbox = useRef(null);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     isPromotion: false,
//   });

//   const userStore = useSelector((store) => store.UserReducer);
//   const dispatch = useDispatch();
//   const [isChecked, setIsChecked] = useState(false);
//   const [eyeclose, seteyeMoment] = useState(false);
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
//     } else if (ele === "name") {
//       nameInput.current.style.display = "block";
//       nameInput.current.focus();
//       namebox.current.style.padding = "5px 20px";
//     } else if (ele === "confirmPassword") {
//       confirmPasswordInput.current.style.display = "block";
//       confirmPasswordInput.current.focus();
//       confirmPasswordbox.current.style.padding = "5px 20px";
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
//     if (event.target === backgroundRef.current && !form.confirmPassword) {
//       confirmPasswordInput.current.style.display = "none";
//       confirmPasswordbox.current.style.padding = "20px";
//     }

//     if (event.target === backgroundRef.current && !form.name) {
//       nameInput.current.style.display = "none";
//       namebox.current.style.padding = "20px";
//     }
//   }

//   // form management

//   function handleInput(e) {
//     const { value, name } = e.target;
//     setForm({ ...form, [name]: value });
//   }

//   // see password;

//   function showPassword() {
//     seteyeMoment(!eyeclose);
//     passwordInput.current.type === "password"
//       ? (passwordInput.current.type = "text")
//       : (passwordInput.current.type = "password");
//   }

//   // handle promotion
//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//     setForm({ ...form, isPromotion: !isChecked });
//   };



//   // SignUp function
//   async function handleSignUp() {
//     const { email, password, confirmPassword, name } = form;
//     if (!email || !password || !confirmPassword || !name) {
//       dispatch(actionsingUpError("All fields are required"));
//       return;
//     }

//     if (confirmPassword !== password) {
//       dispatch(actionsingUpError("Password does not match"));
//       return;
//     }

//     if (password.length < 8) {
//       dispatch(
//         actionsingUpError("Password should be at least 8 characters long")
//       );
//       return;
//     }

//      dispatch(signUpFetch(form)).then((res) => {
//     if(!userStore?.isError){
//       setForm({ email: "", password: "", confirmPassword: "", name: "" });
//       showToast({toast,message:'SignUp Successful',color:'green'});
//     }else{
//       showToast({toast,message:userStore?.isError,color:'red'});
//     }
      
//     });
//   }

//   return (
//     <Box pb="2rem">
//       <Box>
//         <Navbar />
//       </Box>
//       <Box
//         display="flex"
//         justifyContent="center"
//         onClick={blockInput}
//         ref={backgroundRef}
//         pt="100px"
//       >
//         <Box w={{ base: "90%", sm: "80%", md: "40%", lg: "30%" }}>
//           <Box mt="15px">
//             <Heading size="md">Sign up and start learning</Heading>
//           </Box>
//           {/* 2nd box  */}
//           <Box mt="35px">
//             {/* name */}
//             <Box
//               border="1px solid"
//               p="20px"
//               id="name"
//               m="5px 0"
//               onClick={showInput}
//               ref={namebox}
//             >
//               <Box>
//                 <Heading id="name" size="xs">
//                   Name
//                 </Heading>
//               </Box>
//               <Box>
//                 <Input
//                   type="text"
//                   display="none"
//                   ref={nameInput}
//                   border="none"
//                   size="sm"
//                   focusBorderColor="transparent"
//                   _focus={{ outline: "none" }}
//                   name="name"
//                   value={form.name}
//                   onChange={handleInput}
//                 />
//               </Box>
//             </Box>
//             {/* email  */}
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
//               <Box display="flex" justifyContent="space-between">
//                 <Box onClick={showInput} w="100%">
//                   <Heading id="password" size="xs">
//                     Password
//                   </Heading>
//                 </Box>
//                 <Box onClick={showPassword}>
//                   {eyeclose ? (
//                     <AiFillEye size="20px" />
//                   ) : (
//                     <AiOutlineEyeInvisible size="20px" />
//                   )}
//                 </Box>
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
//             {/* confirm password */}
//             <Box
//               border="1px solid"
//               p="20px"
//               id="confirmPassword"
//               m="5px 0"
//               onClick={showInput}
//               ref={confirmPasswordbox}
//             >
//               <Box>
//                 <Heading id="confirmPassword" size="xs">
//                   Confirm Password
//                 </Heading>
//               </Box>
//               <Box>
//                 <Input
//                   type="password"
//                   display="none"
//                   ref={confirmPasswordInput}
//                   border="none"
//                   size="sm"
//                   focusBorderColor="transparent"
//                   _focus={{ outline: "none" }}
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleInput}
//                 />
//               </Box>
//             </Box>

//             <Box display="flex">
//               <Box display="inline" p="15px">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                 />
//               </Box>
//               <Box display="inline">
//                 <Text p="10px">
//                   Send me special offers, personalized recommendations, and
//                   learning tips.
//                 </Text>
//               </Box>
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
//                 onClick={handleSignUp}
//               >
//                 <Heading size="xs">
//                   {userStore.loading ? <Spinner color="white" /> : "Sign Up"}
//                 </Heading>
//               </Button>
//             </Box>
//             <Box display="flex" m="1rem 0" fontSize="0.7rem">
//               <Text>You already have Account with us?</Text>
//               <Link to="/login">
//                 <Text _hover={{}} fontWeight="500" ml="0.5rem" color="black">
//                   Login
//                 </Text>
//               </Link>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
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
  Grid,
  GridItem,
  Image,
  Checkbox,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";

import Navbar from "../Pages/Navbar";
import { signUpFetch } from "../Redux/UserReducer/action";
import { actionsingUpError } from "../Redux/UserReducer/actionType";

// Success Toast
export const showToast = ({ toast, message, color }) => {
  toast({
    position: "top-right",
    top: "100px",
    duration: 3000,
    render: () => (
      <Box color="white" p={3} bg={color}>
        {message || 'Something Went Wrong Please Refresh'}
      </Box>
    ),
  });
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isPromotion: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password, confirmPassword, name } = formData;
    
    // Validation
    if (!email || !password || !confirmPassword || !name) {
      dispatch(actionsingUpError("All fields are required"));
      showToast({toast, message: "All fields are required", color: "red"});
      return;
    }

    if (confirmPassword !== password) {
      dispatch(actionsingUpError("Password does not match"));
      showToast({toast, message: "Password does not match", color: "red"});
      return;
    }

    if (password.length < 8) {
      dispatch(actionsingUpError("Password should be at least 8 characters long"));
      showToast({toast, message: "Password should be at least 8 characters long", color: "red"});
      return;
    }

    dispatch(signUpFetch(formData)).then(() => {
      if (!userStore?.isError) {
        setFormData({ email: "", password: "", confirmPassword: "", name: "", isPromotion: false });
        showToast({toast, message: 'SignUp Successful', color: 'green'});
      } else {
        showToast({toast, message: userStore?.isError, color: 'red'});
      }
    });
  };

  return (
    <Box minH="100vh" bg="gray.50" position="relative">
      <Navbar />
      
      {/* Centered Modal with Image and Form */}
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)" 
        width={{ base: "100%", md: "80%", lg: "70%" }}
        marginTop="25px"
        maxW="1000px"
        boxShadow="xl"
        borderRadius="lg"
        overflow="hidden"
      >
        <Grid templateColumns={{ base: "1fr", md: "5fr 7fr" }}>
          {/* Left side - Image */}
          <GridItem display={{ base: "none", md: "block" }} bg="purple.600">
            <Box h="100%" position="relative">
              <Image
                src="/signup.jpg"
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
                <Heading size="md">Join Our Community</Heading>
                <Text mt="2" fontSize="sm">Start your learning journey with Learn Link today</Text>
              </Box>
            </Box>
          </GridItem>
          
          {/* Right side - SignUp Form */}
          <GridItem bg="white" p={{ base: 6, md: 10 }}>
            <VStack spacing={6} align="flex-start" w="full">
              <Heading size="lg">Sign up and start learning</Heading>
              
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start" w="full">
                  <FormControl id="name" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      borderRadius="md"
                    />
                  </FormControl>
                  
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      borderRadius="md"
                    />
                  </FormControl>
                  
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        borderRadius="md"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          icon={showPassword ? <AiFillEye /> : <AiOutlineEyeInvisible />}
                          variant="ghost"
                          onClick={togglePasswordVisibility}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  
                  <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      borderRadius="md"
                    />
                  </FormControl>
                  
                  <FormControl id="isPromotion">
                    <Checkbox 
                      name="isPromotion" 
                      isChecked={formData.isPromotion}
                      onChange={handleChange}
                      colorScheme="purple"
                      mt={2}
                    >
                      <Text fontSize="sm">
                        Send me special offers, personalized recommendations, and learning tips.
                      </Text>
                    </Checkbox>
                  </FormControl>
                  
                  <Button
                    type="submit"
                    colorScheme="purple"
                    size="lg"
                    w="full"
                    isLoading={userStore.loading}
                    loadingText="Signing Up"
                    mt={4}
                  >
                    Sign Up
                  </Button>
                </VStack>
              </form>
              
              <Flex w="full" justify="center" pt={2}>
                <Text fontSize="sm">Already have an account?</Text>
                <Link to="/login">
                  <Text ml={2} fontSize="sm" fontWeight="medium" color="purple.600">
                    Log in
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

export default SignUp;