import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  Flex,
  chakra,
  keyframes,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaQuestionCircle, FaAward, FaMobileAlt } from "react-icons/fa";

const MotionBox = chakra(motion.div);

const Section2 = () => {
  const colors = {
    primary: "#7B2CBF",
    secondary: "#9D4EDD",
    accent: "#5A189A",
    text: "#2D3748",
    lightBg: "#F8F0FF",
    white: "#FFFFFF"
  };

  const pulse = keyframes`
    0% { transform: scale(0.95); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(0.95); opacity: 0.7; }
  `;

  const float = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  `;

  const features = [
    {
      icon: FaGraduationCap,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world expertise and teaching experience."
    },
    {
      icon: FaQuestionCircle,
      title: "Interactive Quizzes",
      description: "Practice what you've learned with comprehensive quizzes available in every course."
    },
    {
      icon: FaAward,
      title: "Premium Content",
      description: "Access carefully crafted, up-to-date materials designed to accelerate your career growth."
    },
    {
      icon: FaMobileAlt,
      title: "Learn Anywhere",
      description: "Study on any device with our responsive platform that adapts to your lifestyle."
    }
  ];

  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 16, md: 20 }}
      bg="white"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="15%"
        right="5%"
        w="20px"
        h="20px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.15"
        animation={`${pulse} 8s infinite`}
      />
      <Box
        position="absolute"
        bottom="10%"
        left="8%"
        w="15px"
        h="15px"
        borderRadius="full"
        bg={colors.primary}
        opacity="0.1"
        animation={`${pulse} 6s infinite`}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.05"
        backgroundImage="radial-gradient(#7B2CBF 1px, transparent 1px)"
        backgroundSize="30px 30px"
      />

      <Container maxW="1400px" zIndex="1" position="relative">
        <VStack spacing={{ base: 8, md: 12 }} align="center">
          <VStack spacing={3} textAlign="center" maxW="800px">
            <Box 
              mb="2" 
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
                OUR ADVANTAGES
              </Text>
            </Box>
            
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="800"
              bgGradient={`linear(to-r, ${colors.accent}, ${colors.secondary})`}
              bgClip="text"
              letterSpacing="-0.02em"
              mb={2}
            >
              Why Choose Learn Link?
            </Heading>
            
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color={colors.text} 
              opacity="0.8"
              maxW="650px"
            >
              Our platform is designed to elevate your learning experience with tools that help you master new skills and advance your career.
            </Text>
          </VStack>

          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={{ base: 8, lg: 6 }}
            w="full"
          >
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                p={8}
                bg="white"
                borderRadius="xl"
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.05)"
                borderWidth="1px"
                borderColor="gray.100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 25px rgba(123, 44, 191, 0.15)`,
                  borderColor: colors.secondary,
                }}
              >
                <Flex 
                  h="60px" 
                  w="60px" 
                  borderRadius="lg" 
                  bg={`linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`}
                  justify="center" 
                  align="center"
                  mb={5}
                  boxShadow={`0 8px 20px -5px rgba(123, 44, 191, 0.4)`}
                >
                  <Icon 
                    as={feature.icon} 
                    color="white" 
                    w={6} 
                    h={6} 
                  />
                </Flex>
                
                <Text 
                  mt={4} 
                  fontWeight="700" 
                  fontSize="xl" 
                  color={colors.text}
                  mb={2}
                >
                  {feature.title}
                </Text>
                
                <Text 
                  color="gray.600" 
                  fontSize="md"
                  lineHeight="1.6"
                >
                  {feature.description}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
          
          <Box 
            w={{ base: "60%", md: "40%" }} 
            h="4px" 
            borderRadius="full" 
            bgGradient={`linear(to-r, ${colors.primary}, ${colors.secondary}, ${colors.primary})`}
            opacity="0.3"
            mt={4}
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default Section2;