import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
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
  Spacer
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertDateFormat, {
  deleteProduct,
  getvideo,
} from "../../Redux/AdminReducer/action";
import Pagination from "./Pagination";
import AdminNavTop from "../AdminNavTop";

const GetVideos = () => {
  const store = useSelector((store) => store.AdminReducer.videos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 5;
  
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  useEffect(() => {
    dispatch(getvideo(page, limit));
  }, [page, limit, dispatch]);

  const handleDelete = (id, title) => {
    dispatch(deleteProduct(id));
    alert(`${title} is Deleted`);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const count = Math.ceil(store.length / limit);

  const handlePageButton = (val) => {
    setPage((prev) => prev + val);
  };

  const truncateText = (text, maxLength = 30) => {
    return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <AdminNavTop />
      <Container maxW="container.2xl" pt={20} px={20} pb={10}>
        <Card shadow="md" borderRadius="lg" mb={6}>
          <CardHeader>
            <Flex direction={{ base: "column", md: "row" }} align="center">
              <Heading size="lg">Course Videos</Heading>
              <Spacer />
            </Flex>
          </CardHeader>
          
          <CardBody>
            <Flex justifyContent="space-between" mb={4}>
              <Text fontWeight="medium" color="gray.600">
                {store?.length} video{store?.length !== 1 ? 's' : ''} found
              </Text>
            </Flex>
            
            <TableContainer>
              <Table variant="simple" size={tableSize} borderRadius="md" overflow="hidden">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Title</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Uploaded</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Description</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {store?.length > 0 ? (
                    store.map((el, i) => (
                      <Tr key={i}>
                        <Td fontWeight="medium">{truncateText(el.title, 20)}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{convertDateFormat(el.createdAt)}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{truncateText(el.description)}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{el.link}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={6} textAlign="center" py={10}>
                        <Text fontSize="lg">No videos found</Text>
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
    </Box>
  );
};

export default GetVideos;