
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password, confirmPassword, name } = formData;
    
    if (!email || !password || !confirmPassword || !name) {
      showToast({ toast, message: "All fields are required", color: "red" });
      return;
    }
  
    if (confirmPassword !== password) {
      showToast({ toast, message: "Password does not match", color: "red" });
      return;
    }
  
    if (password.length < 8) {
      showToast({ toast, message: "Password should be at least 8 characters long", color: "red" });
      return;
    }
  
    const response = await dispatch(signUpFetch(formData));
  
    if (response.success) {
      setFormData({ email: "", password: "", confirmPassword: "", name: "", isPromotion: false });
      showToast({ toast, message: response.message, color: "green" });
    } else {
      showToast({ toast, message: response.message, color: "red" });
    }
  };
  

  return (
    <Box minH="100vh" bg="gray.50" position="relative">
      <Navbar />
      
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        transform="translate(-50%, -50%)" 
        width={{ base: "100%", md: "80%", lg: "70%" }}
        maxW="1000px"
        boxShadow="xl"
        borderRadius="lg"
        overflow="hidden"
        paddingTop={'80px'}
      >
        <Grid templateColumns={{ base: "1fr", md: "5fr 7fr" }}>
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