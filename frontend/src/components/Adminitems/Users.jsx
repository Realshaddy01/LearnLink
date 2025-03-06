import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertDateFormat, {
  deleteUsers,
  getUser,
} from "../../Redux/AdminReducer/action";
import Pagination from "./Pagination";
import AdminNavTop from "../AdminNavTop";

const Users = () => {
  // Redux and Router hooks
  const store = useSelector((store) => store.AdminReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  
  // State management
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const limit = 5; // Changed from 4 to 5 as requested
  
  // Responsive sizing
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  
  // Alert dialog for delete confirmation
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // Handlers
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  
  const handleSelect = (e) => {
    setOrder(e.target.value);
  };
  
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        await dispatch(deleteUsers(selectedUser._id));
        dispatch(getUser(page, limit)); // Refresh the list
        
        toast({
          title: "User deleted",
          description: `${selectedUser.name} has been removed`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        onClose();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageButton = (val) => {
    setPage((prev) => prev + val);
  };

  // Fetch users when dependencies change
  useEffect(() => {
    dispatch(getUser(page, limit));
  }, [page, limit, dispatch]);

  // For pagination
  const count = Math.ceil((store?.length || 0) / limit) || 2; // Calculate number of pages based on data length

  // Truncate long text
  const truncateText = (text, maxLength = 30) => {
    return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <AdminNavTop />
      <Container maxW="container.2xl" pt={20} px={20} pb={10}>
        <Card shadow="md" borderRadius="lg" mb={6}>
          <CardHeader>
            <Flex direction={{ base: "column", md: "row" }} align="center" gap={4}>
              <Heading size="lg">User Management</Heading>
              <Spacer />
            </Flex>
          </CardHeader>
          
          <CardBody>
            <Flex justifyContent="space-between" mb={4}>
              <Text fontWeight="medium" color="gray.600">
                {store?.length} user{store?.length !== 1 ? 's' : ''} found
              </Text>
              
              <Button
                as={Link}
                to="/admin/users/add"
                colorScheme="blue"
                leftIcon={<AddIcon />}
                size="sm"
              >
                Add New User
              </Button>
            </Flex>
            
            <TableContainer>
              <Table variant="simple" size={tableSize} borderRadius="md" overflow="hidden">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Email</Th>
                    <Th>Subscribed Courses</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {store?.length > 0 ? (
                    store.map((user) => (
                      <Tr key={user._id}>
                        <Td fontWeight="medium">{user.name}</Td>
                        <Td>
                          <Badge colorScheme={user.role === "admin" ? "red" : "green"} borderRadius="full" px={2}>
                            {user.role}
                          </Badge>
                        </Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{truncateText(user.email)}</Td>
                        <Td>
                          <Badge colorScheme="blue" borderRadius="full" px={2}>
                            {user.course.length}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                size="sm"
                                variant="outline"
                              >
                                Actions
                              </MenuButton>
                              <MenuList>
                                <MenuItem
                                  onClick={() => handleDeleteClick(user)}
                                  icon={<DeleteIcon />}
                                  color="red.500"
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={7} textAlign="center" py={10}>
                        <VStack spacing={3}>
                          <Text fontSize="lg">No users found</Text>
                          <Text color="gray.500">Try adjusting your search or create a new user</Text>
                          <Button
                            as={Link}
                            to="/admin/users/add"
                            colorScheme="blue"
                            leftIcon={<AddIcon />}
                            size="sm"
                            mt={2}
                          >
                            Add New User
                          </Button>
                        </VStack>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            
            <Flex justifyContent="center" mt={6}>
              <ButtonGroup isAttached variant="outline">
                <Button 
                  isDisabled={page <= 1} 
                  onClick={() => handlePageButton(-1)}
                >
                  Previous
                </Button>
                <Pagination
                  totalCount={count}
                  current_page={page}
                  handlePageChange={handlePageChange}
                />
                <Button 
                  isDisabled={page >= count} 
                  onClick={() => handlePageButton(1)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Flex>
          </CardBody>
        </Card>
      </Container>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{selectedUser?.name}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Users;