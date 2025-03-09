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
        showToast({ toast, message: userStore?.isError, color: 'red' });
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
      
      {/* Centered Modal with Image and Form */}
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
          {/* Left side - Image */}
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
          
          {/* Right side - Login Form */}
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