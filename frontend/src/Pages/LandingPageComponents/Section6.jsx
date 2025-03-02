import { Box, Container, Heading, Text, Button, Flex, chakra, keyframes, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import sectionImage from "../../asset/sectionImage.png";
import { useNavigate } from "react-router-dom";

const MotionBox = chakra(motion.div);

const Section6 = () => {
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
      py={{ base: 16, md: 20 }}
      overflow="hidden"
      bg="linear-gradient(120deg, #F8F0FF 0%, #F0E6FF 100%)"
    >
      <Box
        position="absolute"
        top="15%"
        left="8%"
        w="25px"
        h="25px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.15"
        animation={`${pulse} 6s infinite`}
      />
      <Box
        position="absolute"
        bottom="20%"
        right="12%"
        w="18px"
        h="18px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.2"
        animation={`${pulse} 8s infinite`}
      />
      <Box
        position="absolute"
        top="40%"
        right="20%"
        w="30px"
        h="30px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.1"
        animation={`${pulse} 10s infinite`}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        transform="skewY(-4deg)"
        transformOrigin="top right"
        bg={`linear-gradient(135deg, rgba(123, 44, 191, 0.07) 0%, rgba(123, 44, 191, 0.02) 100%)`}
        zIndex="0"
      />

      <Container maxW="1400px" zIndex="1" position="relative">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 10, lg: 8 }}
        >
          <Box 
            flex="1" 
            zIndex="1" 
            pr={{ lg: 8 }}
            textAlign={{ base: "center", lg: "left" }}
            maxW={{ lg: "55%" }}
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
                SUCCESS STORIES
              </Text>
            </Box>

            <Heading
              as="h2"
              fontSize={{ base: "2.5rem", md: "3.2rem", lg: "3.8rem" }}
              lineHeight="1.2"
              fontWeight="800"
              mb={6}
              bgGradient={`linear(to-r, ${colors.accent}, ${colors.secondary})`}
              bgClip="text"
              letterSpacing="-0.02em"
            >
              Learner outcomes on{" "}
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
              fontSize={{ base: "lg", md: "xl" }}
              mb={8}
              color={colors.text}
              lineHeight="1.7"
              fontWeight="400"
            >
              According to the latest findings from Learn Link's report,{" "}
              <chakra.span 
                fontWeight="700" 
                color={colors.primary}
                position="relative"
                display="inline-block"
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  height: "8px",
                  borderRadius: "4px",
                  bg: colors.primary,
                  opacity: "0.15",
                  zIndex: "-1"
                }}
              >
                many students that have taken courses have reportedly shown progress on their learning.
              </chakra.span>{" "}
              These include their promotion, enhanced job performance, successful job transitions, increased employability, and skill development. Learn Link's extensive curriculum and industry-recognized certifications have played a pivotal role in facilitating the professional growth of learners.
            </Text>

            <Flex
              mt={8}
              gap={4}
              direction={{ base: "column", sm: "row" }}
              align={{ base: "center", lg: "flex-start" }}
              justify={{ base: "center", lg: "flex-start" }}
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
                Join for Free
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
                onClick={() => navigate("/courses")}
              >
                Browse Courses
              </Button>
            </Flex>
            
            <Flex mt={10} gap={6} align="center" justify={{ base: "center", lg: "flex-start" }} flexWrap="wrap">
              <Flex 
                align="center" 
                bg="rgba(123, 44, 191, 0.08)" 
                px={4} 
                py={2} 
                borderRadius="full"
              >
                <Box 
                  as="span" 
                  w="8px" 
                  h="8px" 
                  borderRadius="full" 
                  bg={colors.primary} 
                  mr={2}
                />
                <Text fontSize="sm" fontWeight="600" color={colors.accent}>87% Career Growth</Text>
              </Flex>
              
              <Flex 
                align="center" 
                bg="rgba(123, 44, 191, 0.08)" 
                px={4} 
                py={2} 
                borderRadius="full"
              >
                <Box 
                  as="span" 
                  w="8px" 
                  h="8px" 
                  borderRadius="full" 
                  bg={colors.primary} 
                  mr={2}
                />
                <Text fontSize="sm" fontWeight="600" color={colors.accent}>300+ Employers Trust Us</Text>
              </Flex>
            </Flex>
          </Box>

          <Box 
            flex="1" 
            zIndex="1" 
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="absolute"
              width={{ base: "80%", md: "85%", lg: "90%" }}
              height={{ base: "80%", md: "85%", lg: "90%" }}
              borderRadius="38% 62% 63% 37% / 41% 44% 56% 59%"
              bg={`linear-gradient(135deg, rgba(123, 44, 191, 0.25) 0%, rgba(157, 78, 221, 0.1) 100%)`}
              filter="blur(25px)"
              zIndex="0"
              transformOrigin="center"
              animation={`${pulse} 12s infinite ease-in-out`}
            />
            
            <MotionBox
              position="relative"
              zIndex="2"
              width={{ base: "100%", md: "90%" }}
              height={{ base: "auto" }}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="lg"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Box
                position="absolute"
                top="-10px"
                right="-10px"
                width="70px"
                height="70px"
                borderRadius="2xl"
                bg={colors.secondary}
                opacity="0.2"
                animation={`${pulse} 4s infinite ease-in-out`}
              />
              
              <Box
                position="absolute"
                bottom="-20px"
                left="-20px"
                width="100px"
                height="100px"
                borderRadius="full"
                bg={colors.primary}
                opacity="0.15"
                animation={`${pulse} 5s infinite ease-in-out`}
              />
              
              <Box
                as={Image}
                src={sectionImage}
                objectFit="cover"
                width="100%"
                height="auto"
                borderRadius="3xl"
                boxShadow={`0 20px 30px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(123, 44, 191, 0.1)`}
                filter="drop-shadow(0 10px 15px rgba(123, 44, 191, 0.15))"
                transform="scale(1.02)"
              />
            </MotionBox>
          </Box>
        </Flex>
        
        <Flex 
          mt={{ base: 12, lg: 16 }} 
          bg="white" 
          borderRadius="2xl" 
          boxShadow="xl"
          p={{ base: 6, md: 8 }}
          justify="space-around"
          align="center"
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 4 }}
          position="relative"
          overflow="hidden"
          zIndex="2"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            height="5px"
            bgGradient={`linear(to-r, ${colors.primary}, ${colors.secondary})`}
          />
          
          <StatItem 
            value="87%" 
            label="Career Growth" 
            color={colors.primary} 
          />
          
          <Box 
            height={{ base: "1px", md: "50px" }} 
            width={{ base: "80%", md: "1px" }} 
            bg="gray.200"
          />
          
          <StatItem 
            value="1M+" 
            label="Active Students" 
            color={colors.primary} 
          />
          
          <Box 
            height={{ base: "1px", md: "50px" }} 
            width={{ base: "80%", md: "1px" }} 
            bg="gray.200"
          />
          
          <StatItem 
            value="300+" 
            label="Hiring Partners" 
            color={colors.primary} 
          />
        </Flex>
      </Container>
      
      <Box
        position="absolute"
        bottom="-2px"
        left="0"
        right="0"
        height="120px"
        bg="white"
        transform="skewY(-2deg)"
        transformOrigin="bottom"
        zIndex="0"
      />
    </Box>
  );
};

const StatItem = ({ value, label, color }) => (
  <Flex 
    direction="column" 
    align="center" 
    textAlign="center"
    px={4}
  >
    <Text 
      fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} 
      fontWeight="800" 
      color={color}
      mb={2}
    >
      {value}
    </Text>
    <Text 
      fontSize={{ base: "sm", md: "md" }}
      fontWeight="500"
      color="gray.600"
    >
      {label}
    </Text>
  </Flex>
);

export default Section6;