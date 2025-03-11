import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Badge,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const QuizList = () => {
  const { id } = useParams();
  const toast = useToast();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const response = await axios.get(
          `http://localhost:5000/quiz/course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuizzes(response.data.quizzes);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch quizzes");
        toast({
          title: "Error",
          description: err.response?.data?.error || "Failed to fetch quizzes",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [id, toast]);

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p="5">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Container maxW="1200px" mt="6" mb="8">
      <Box mb="6">
        <Heading size="lg" mb="2">
          Quizzes for This Course
        </Heading>
        <Text>Test your knowledge with these quizzes</Text>
      </Box>

      {quizzes.length === 0 ? (
        <Box textAlign="center" p="10" borderWidth="1px" borderRadius="lg">
          <Text mb="4">No quizzes available for this course yet.</Text>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
            {quizzes.map((quiz) => (
              <Card key={quiz._id} variant="outline" height="100%">
                <CardHeader>
                  <Heading size="md">{quiz.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{quiz.description}</Text>
                  <Box mt="4">
                    <Badge colorScheme="blue" mb="2">
                      {quiz.questions.length} Questions
                    </Badge>
                    <Text fontSize="sm" color="gray.500">
                      Created: {new Date(quiz.createdAt).toLocaleDateString()}
                    </Text>
                  </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link to={`/take-quiz/${quiz._id}`}>
                    <Button colorScheme="purple" variant="solid">
                      Take Quiz
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default QuizList;