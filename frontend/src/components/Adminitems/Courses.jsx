
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
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
  useDisclosure
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertDateFormat, {
  deleteProduct,
  getProduct,
} from "../../Redux/AdminReducer/action";
import Pagination from "./Pagination";
import AdminNavTop from "../AdminNavTop";

const Courses = () => {
  // Redux and Router hooks
  const store = useSelector((store) => store.AdminReducer.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  
  // State management
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const limit = 4;
  
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
  
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    onOpen();
  };

  // const handleDeleteConfirm = () => {
  //   if (selectedCourse) {
  //     dispatch(deleteProduct(selectedCourse._id));
  //     toast({
  //       title: "Course deleted",
  //       description: `${selectedCourse.title} has been removed`,
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     onClose();
  //   }
  // };
  const handleDeleteConfirm = async () => {
    if (selectedCourse) {
      try {
        await dispatch(deleteProduct(selectedCourse._id)); // Ensure deletion completes
        dispatch(getProduct(page, limit, search, order)); // Fetch updated list
  
        toast({
          title: "Course deleted",
          description: `${selectedCourse.title} has been removed`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        onClose();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };
  
  

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageButton = (val) => {
    setPage((prev) => prev + val);
  };

  // Fetch courses when dependencies change
  useEffect(() => {
    dispatch(getProduct(page, limit, search, order));
  }, [page, search, order, limit, dispatch]);

  // For pagination
  const count = 4; // This should ideally come from the API

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
              <Heading size="lg">Course Management</Heading>
              <Spacer />
              <HStack spacing={4} width={{ base: "100%", md: "auto" }}>
                <InputGroup maxW={{ base: "100%", md: "300px" }}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input placeholder="Search courses..." onChange={handleSearch} />
                </InputGroup>
                
                <Select onChange={handleSelect} maxW={{ base: "100%", md: "250px" }}>
                  <option value="">Sort by...</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </Select>
              </HStack>
            </Flex>
          </CardHeader>
          
          <CardBody>
            <Flex justifyContent="space-between" mb={4}>
              <Text fontWeight="medium" color="gray.600">
                {store?.length} course{store?.length !== 1 ? 's' : ''} found
              </Text>
              
              <Button
                as={Link}
                to="/admin/addCourse"
                colorScheme="blue"
                leftIcon={<AddIcon />}
                size="sm"
              >
                Add New Course
              </Button>
            </Flex>
            
            <TableContainer>
              <Table variant="simple" size={tableSize} borderRadius="md" overflow="hidden">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Title</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Date</Th>
                    <Th>Category</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Description</Th>
                    <Th isNumeric>Price</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Instructor</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {store?.length > 0 ? (
                    store.map((course) => (
                      <Tr key={course._id}>
                        <Td fontWeight="medium">{truncateText(course.title, 20)}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{convertDateFormat(course.createdAt)}</Td>
                        <Td>
                          <Badge colorScheme="blue" borderRadius="full" px={2}>
                            {course.category}
                          </Badge>
                        </Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{truncateText(course.description)}</Td>
                        <Td isNumeric fontWeight="bold">${course.price}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{course.teacher}</Td>
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
                                  as={Link}
                                  to={`/admin/edit/${course._id}`}
                                  icon={<EditIcon />}
                                >
                                  Edit Course
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleDeleteClick(course)}
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
                          <Text fontSize="lg">No courses found</Text>
                          <Text color="gray.500">Try adjusting your search or create a new course</Text>
                          <Button
                            as={Link}
                            to="/admin/addCourse"
                            colorScheme="blue"
                            leftIcon={<AddIcon />}
                            size="sm"
                            mt={2}
                          >
                            Add New Course
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
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{selectedCourse?.title}"? This action cannot be undone.
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

export default Courses;