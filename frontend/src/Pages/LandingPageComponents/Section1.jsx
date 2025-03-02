import { Box, Container, Heading, Text, Button, Flex, chakra, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero from "../../asset/landingPage.png";

const MotionBox = chakra(motion.div);

const Section1 = () => {
  const navigate = useNavigate();

  const colors = {
    primary: "#7B2CBF",
    secondary: "#9D4EDD",
    accent: "#5A189A",
    text: "#2D3748",
    lightBg: "#F8F0FF",
    white: "#FFFFFF"
  };

  const float = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  `;

  const pulse = keyframes`
    0% { transform: scale(0.95); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(0.95); opacity: 0.7; }
  `;

  const shimmer = keyframes`
    0% { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  `;

  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 16, md: 24 }}
      overflow="hidden"
      bg="linear-gradient(120deg, #F8F0FF 0%, #F0E6FF 100%)"
    >
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="20px"
        h="20px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.2"
        animation={`${pulse} 7s infinite`}
      />
      <Box
        position="absolute"
        bottom="15%"
        right="10%"
        w="15px"
        h="15px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.15"
        animation={`${pulse} 5s infinite`}
      />
      <Box
        position="absolute"
        top="30%"
        right="15%"
        w="30px"
        h="30px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.1"
        animation={`${pulse} 9s infinite`}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        transform="skewY(-6deg)"
        transformOrigin="top right"
        bg={`linear-gradient(135deg, rgba(123, 44, 191, 0.08) 0%, rgba(123, 44, 191, 0.01) 100%)`}
        zIndex="0"
      />

      <Container maxW="1400px" zIndex="1" position="relative">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 12, lg: 6 }}
        >
          <Box 
            flex="1" 
            zIndex="1" 
            pr={{ lg: 8 }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Box 
              mb="4" 
              display="inline-block" 
              px="3" 
              py="1" 
              bg="rgba(123, 44, 191, 0.1)" 
              borderRadius="full"
            >
              <Text 
                fontSize="sm" 
                fontWeight="600" 
                color={colors.accent}
                letterSpacing="wider"
              >
                TRANSFORM YOUR CAREER
              </Text>
            </Box>

            <Heading
              as="h1"
              fontSize={{ base: "3.5rem", md: "4.5rem", lg: "5rem" }}
              lineHeight="1.1"
              fontWeight="800"
              mb={6}
              bgGradient={`linear(to-r, ${colors.accent}, ${colors.secondary})`}
              bgClip="text"
              letterSpacing="-0.02em"
            >
              Land your Dream job with{" "}
              <chakra.span 
                position="relative" 
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-6px",
                  left: "0",
                  width: "100%",
                  height: "4px",
                  borderRadius: "2px",
                  bg: colors.primary,
                  opacity: "0.6"
                }}
              >
                Learn Link
              </chakra.span>
            </Heading>

            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              mb={8}
              color={colors.text}
              lineHeight="1.6"
              maxW={{ lg: "90%" }}
            >
              <chakra.span fontWeight="600" color={colors.primary}>Learn Link</chakra.span> is the 
              ultimate platform connecting educators and students. Create customized courses, 
              advance your skills, and experience learning reimagined for the digital age.
            </Text>

            <Flex
              gap={5}
              direction={{ base: "column", sm: "row" }}
              align={{ base: "stretch", sm: "center" }}
              justify={{ base: "center", lg: "flex-start" }}
              mt={10}
            >
              <Button
                size="lg"
                height="60px"
                width={{ base: "full", sm: "auto" }}
                px={8}
                fontSize="md"
                fontWeight="600"
                bgGradient={`linear(to-r, ${colors.primary}, ${colors.secondary})`}
                color="white"
                borderRadius="xl"
                boxShadow={`0 10px 25px -5px rgba(123, 44, 191, 0.4)`}
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: `0 20px 25px -5px rgba(123, 44, 191, 0.5)`,
                  bgGradient: `linear(to-r, ${colors.secondary}, ${colors.primary})`,
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                onClick={() => navigate("/signup")}
              >
                Get Started for Free
              </Button>
              
              <Button
                size="lg"
                height="60px"
                width={{ base: "full", sm: "auto" }}
                px={8}
                fontSize="md"
                fontWeight="600"
                variant="outline"
                bg="transparent"
                color={colors.primary}
                borderWidth="2px"
                borderColor={colors.primary}
                borderRadius="xl"
                _hover={{
                  transform: "translateY(-3px)",
                  bg: "rgba(123, 44, 191, 0.05)",
                  borderColor: colors.secondary,
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
                onClick={() => navigate("/login")}
              >
                Explore Courses
              </Button>
            </Flex>
            
            <Flex mt={12} display={{ base: "none", lg: "flex" }} opacity="0.8" align="center">
              <Flex align="center" mr={8}>
                <Box 
                  as="span" 
                  w="4px" 
                  h="4px" 
                  borderRadius="full" 
                  bg={colors.primary} 
                  mr={2}
                ></Box>
                <Text fontSize="sm" fontWeight="500">10k+ Courses</Text>
              </Flex>
              <Flex align="center" mr={8}>
                <Box 
                  as="span" 
                  w="4px" 
                  h="4px" 
                  borderRadius="full" 
                  bg={colors.primary} 
                  mr={2}
                ></Box>
                <Text fontSize="sm" fontWeight="500">500+ Instructors</Text>
              </Flex>
              <Flex align="center">
                <Box 
                  as="span" 
                  w="4px" 
                  h="4px" 
                  borderRadius="full" 
                  bg={colors.primary} 
                  mr={2}
                ></Box>
                <Text fontSize="sm" fontWeight="500">1M+ Students</Text>
              </Flex>
            </Flex>
          </Box>

          <Box 
            flex="1" 
            zIndex="1" 
            position="relative"
          >
            <Box
              position="relative"
              height={{ base: "350px", md: "450px", lg: "500px" }}
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <MotionBox
                position="absolute"
                width={{ base: "280px", md: "380px", lg: "480px" }}
                height={{ base: "280px", md: "380px", lg: "480px" }}
                borderRadius="38% 62% 63% 37% / 41% 44% 56% 59%"
                bg={`linear-gradient(135deg, rgba(123, 44, 191, 0.3) 0%, rgba(157, 78, 221, 0.15) 100%)`}
                filter="blur(15px)"
                animate={{
                  borderRadius: [
                    "38% 62% 63% 37% / 41% 44% 56% 59%",
                    "45% 55% 67% 33% / 53% 36% 64% 47%",
                    "33% 67% 58% 42% / 63% 68% 32% 37%",
                    "38% 62% 63% 37% / 41% 44% 56% 59%"
                  ],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <MotionBox
                position="absolute"
                width={{ base: "200px", md: "280px", lg: "320px" }}
                height={{ base: "200px", md: "280px", lg: "320px" }}
                borderRadius="63% 37% 27% 73% / 47% 32% 68% 53%"
                bg={`linear-gradient(135deg, rgba(123, 44, 191, 0.2) 0%, rgba(157, 78, 221, 0.1) 100%)`}
                filter="blur(10px)"
                animate={{
                  borderRadius: [
                    "63% 37% 27% 73% / 47% 32% 68% 53%",
                    "37% 63% 56% 44% / 27% 37% 63% 73%",
                    "41% 59% 33% 67% / 61% 39% 61% 39%",
                    "63% 37% 27% 73% / 47% 32% 68% 53%"
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              <MotionBox
                position="relative"
                zIndex="2"
                width={{ base: "80%", md: "80%", lg: "80%" }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                filter="drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))"
              >
                <Box
                  as="img"
                  src={Hero}
                  alt="Learn Link Hero Image"
                  width="100%"
                  height="auto"
                  objectFit="contain"
                  borderRadius="xl"
                />
                
                <Box
                  position="absolute"
                  top="-20px"
                  right="-30px"
                  width="60px"
                  height="60px"
                  borderRadius="xl"
                  bg={`rgba(123, 44, 191, 0.1)`}
                  backdropFilter="blur(10px)"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  display={{ base: "none", md: "block" }}
                  animation={`${pulse} 3s infinite`}
                />
                
                <Box
                  position="absolute"
                  bottom="10%"
                  left="-40px"
                  width="80px"
                  height="80px"
                  borderRadius="full"
                  bg={`rgba(123, 44, 191, 0.07)`}
                  backdropFilter="blur(10px)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  display={{ base: "none", md: "block" }}
                  animation={`${pulse} 4s infinite`}
                />
              </MotionBox>
            </Box>
          </Box>
        </Flex>
      </Container>
      
      <Box
        position="absolute"
        bottom="-2px"
        left="0"
        right="0"
        height="150px"
        bg="white"
        transform="skewY(-3deg)"
        transformOrigin="bottom"
        zIndex="0"
      />
    </Box>
  );
};

export default Section1;