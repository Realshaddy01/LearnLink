import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Slider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
const UserSlider = () => {
  const images = [
    "https://ici.net.au/blog/wp-content/uploads/2022/01/Study-Tips.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGjP3-lAJ2z0c9Lj6QhAGtZyjUZz7S7gHdQ&s",
    "https://images.seattleschild.com/wp-content/uploads/2021/09/Classy-Treehouse-w-logo-e1632341660272.png",
  ];

  const textOnImage = [
    "Study Materials",
    "Quiz",
    "Successful Career",
  ];

  const indexDescription = [
    "Enhance your learning experience with comprehensive study materials, including engaging video lessons. These videos are carefully crafted to break down complex topics, provide real-world examples, and guide you through each concept at your own pace. Learn anytime, anywhere with high-quality content designed to help you succeed!",
    "Test your knowledge and reinforce your learning with quizzes in each course. Quizzes are designed to help you review key concepts, identify areas for improvement, and ensure you’re mastering the material step by step. Learning through quizzes makes the process engaging, interactive, and effective!",
    "Learn Link is your gateway to a successful career, offering the knowledge and skills needed for professional excellence. With Learn Link, you can prepare for a bright future and achieve your career goals through high-quality education and training."
  ];
  
  
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (value) => {
    setCurrentIndex(value);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Container mt="100px" maxW="container.xxl" >
        <Flex direction="column" align="center" bg='#F7F3EA'>
          <Flex align="center" justify="space-between" mb={4}>
            <Button colorScheme="blue" borderRadius={"50%"} onClick={handlePrevious}>
              <ArrowLeftIcon />
            </Button>
            <Box position="relative" p='2'>
              <Image
                w={"2000px"}
                h={"400px"}
                fit="cover"
                src={`${images[currentIndex]}`}
              />
              <Box
                position="absolute"
                bottom="10"
                w="100%"
                color="rgba(255, 255, 255, 0.8)"
                p="8px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Text>
                  <Heading
                    size="3xl"
                    letterSpacing="1.5px"
                    style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
                  >
                    {textOnImage[currentIndex]}
                  </Heading>
                </Text>
              </Box>
            </Box>
            <Button colorScheme="blue" borderRadius={"50%"} onClick={handleNext}>
              <ArrowRightIcon />
            </Button>
          </Flex>

          <Slider
            defaultValue={currentIndex}
            min={0}
            max={images.length - 1}
            onChange={handleChange}
            w="400px"
          >
            {/* <SliderTrack>
              <SliderFilledTrack bg="blue.500" />
            </SliderTrack>
            <SliderThumb /> */}
          </Slider>
          <Box pb='3rem' w='80%' m='auto' p='4'>
          <Text>
            <Heading
              size="md"
              fontWeight='500'
              letterSpacing="2px"
              lineHeight='2rem'
            >
              {indexDescription[currentIndex]}
            </Heading>
          </Text>
        </Box>
        </Flex>
        
      </Container>
    </>
  );
};

export default UserSlider;
