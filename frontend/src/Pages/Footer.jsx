import React from "react";
import { 
  Box, 
  Container, 
  Flex, 
  Grid, 
  GridItem, 
  Text, 
  Button, 
  IconButton, 
  Divider, 
  Heading,
  List,
  ListItem
} from "@chakra-ui/react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube,
  FaArrowRight
} from "react-icons/fa";

const Footer = () => {
  const colors = {
    primary: "#7B2CBF",
    secondary: "#9D4EDD",
    accent: "#5A189A",
    text: "#2D3748",
    lightBg: "#F8F0FF",
    white: "#FFFFFF"
  };

  const footerSections = [
    {
      title: "Popular Topics",
      items: [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Business Analytics",
        "Digital Marketing"
      ]
    },
    {
      title: "Learning Resources",
      items: [
        "Video Tutorials",
        "Practice Exercises"
      ]
    },
  ];

  return (
    <Box position="relative" bg="white" overflow="hidden">
      <Box
        position="absolute"
        top="-2px"
        left="0"
        right="0"
        height="120px"
        bg={colors.lightBg}
        transform="skewY(-2deg)"
        transformOrigin="top"
        zIndex="0"
      />

      <Container maxW="1400px" position="relative" zIndex="1" pt={20}>
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "2fr 1fr 1fr 1fr" }}
          gap={{ base: 12, lg: 8 }}
          mb={10}
        >
          <GridItem>
            <Flex direction="column" align={{ base: "center", md: "flex-start" }} mb={6}>
              <Heading 
                as="h2" 
                fontSize="3xl" 
                fontWeight="bold" 
                mb={4} 
                bgGradient={`linear(to-r, ${colors.accent}, ${colors.secondary})`}
                bgClip="text"
              >
                LearnLink
              </Heading>
              <Text color={colors.text} maxW="380px" mb={6} fontSize="md">
                Empowering learners worldwide with expert-led courses, industry-recognized certifications, and personalized learning paths to achieve career success.
              </Text>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full" mt={2}>
                <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
                  <Text fontSize="xl" fontWeight="bold" color={colors.primary}>10K+</Text>
                  <Text fontSize="sm" color={colors.text}>Online Courses</Text>
                </Flex>
                <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
                  <Text fontSize="xl" fontWeight="bold" color={colors.primary}>1M+</Text>
                  <Text fontSize="sm" color={colors.text}>Active Learners</Text>
                </Flex>
                <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
                  <Text fontSize="xl" fontWeight="bold" color={colors.primary}>500+</Text>
                  <Text fontSize="sm" color={colors.text}>Expert Instructors</Text>
                </Flex>
                <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
                  <Text fontSize="xl" fontWeight="bold" color={colors.primary}>200+</Text>
                  <Text fontSize="sm" color={colors.text}>Learning Paths</Text>
                </Flex>
              </Grid>
            </Flex>
          </GridItem>

          {footerSections.map((section, idx) => (
            <GridItem key={idx}>
              <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
                <Text 
                  fontSize="md" 
                  fontWeight="bold" 
                  mb={4} 
                  color={colors.primary}
                  borderBottom="2px solid"
                  borderColor={colors.secondary}
                  pb={2}
                  display="inline-block"
                >
                  {section.title}
                </Text>
                <List spacing={3}>
                  {section.items.map((item, itemIdx) => (
                    <ListItem key={itemIdx}>
                      <Text 
                        fontSize="sm"
                        color={colors.text}
                        display="flex"
                        alignItems="center"
                        cursor="pointer"
                        _hover={{ color: colors.primary }}
                      >
                        <Box 
                          as="span" 
                          w="4px" 
                          h="4px" 
                          borderRadius="full" 
                          bg={colors.primary} 
                          mr={2}
                          opacity="0.7"
                        />
                        {item}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </Flex>
            </GridItem>
          ))}
        </Grid>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          bg={`linear-gradient(90deg, ${colors.primary}10 0%, ${colors.secondary}30 100%)`}
          p={6}
          borderRadius="xl"
          mb={10}
        >
          <Box mb={{ base: 4, md: 0 }} textAlign={{ base: "center", md: "left" }}>
            <Text fontWeight="bold" fontSize="lg" color={colors.text} mb={1}>
              Ready to start your learning journey?
            </Text>
            <Text fontSize="sm" color={colors.text}>
              Join millions of learners already on LearnLink
            </Text>
          </Box>
        </Flex>

        <Divider borderColor={`${colors.primary}20`} mb={6} />

        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="center" 
          pb={6}
        >
          <Text fontSize="sm" color={colors.text} mb={{ base: 4, md: 0 }}>
            © 2025 LearnLink. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};


export default Footer;