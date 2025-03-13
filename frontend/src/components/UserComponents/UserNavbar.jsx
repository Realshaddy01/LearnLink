import React, { useState } from "react";
import {
  Flex,
  Box,
  Input,
  IconButton,
  useBreakpointValue,
  Text,
  Link,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBarDrawer } from "../NavBarDrawer";
import { showToast } from "../SignUp";

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const toast = useToast();
  const location = useLocation();
  function home() {
    navigate("/learnlink");
  }

  function handleShowSearchBar() {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar && location.pathname == "/learnlink") {
      showToast({
        toast,
        message: `Below is you search Result`,
        color: "green",
      });
    }
  }

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        bg="#f5f5f5"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        position="fixed"
        width="100vw"
        zIndex={12}
        top={0}
      >
        <Flex align="center">
          <Box>
            {/* Logo */}
            {/* <img src={image} alt="Logo" width="30%" /> */}
            <Text
              fontSize={30}
              fontWeight="extrabold"
              color="#6D28D9"
              _hover={{ cursor: "pointer" }}
              onClick={home}
            >
              Learn Link
            </Text>
          </Box>
        </Flex>

        {!isMobile ? (
          <></>
        ) : (
          <Flex align="center">
            <IconButton
              aria-label="Menu"
              icon={<FaBars />}
              bg="transparent"
              color="#6D28D9"
              fontSize="2xl"
              mr={2}
              onClick={onOpen}
            />
          </Flex>
        )}

        {!isMobile && (
          <Flex align="center">
            {/* Links */}
            <Box mr={4}>
            </Box>
            {/* <Box mr={4}>
              <Link
                _hover={{ color: "#003e9c", textDecoration: "underline" }}
                href="/enterprise"
              >
                For Enterprise
              </Link>
            </Box>
            <Box mr={4}>
              <Link
                _hover={{ color: "#003e9c", textDecoration: "underline" }}
                href="/universities"
              >
                For Universities
              </Link>
            </Box> */}
            {/* <Box mr={4}>
            <Button colorScheme="red" size="md" onClick={handleLogout}>
              Logout
            </Button>
          </Box> */}
            <Box>
              <Dropdown />
            </Box>
          </Flex>
        )}
      </Flex>
      <NavBarDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
