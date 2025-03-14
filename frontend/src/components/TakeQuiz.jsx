import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  VStack,
  Radio,
  RadioGroup,
  Progress,
  Card,
  CardBody,
  Divider,
  Spinner,
  Center,
  Badge,
  Stack,
  useToast,
  Flex,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

const TakeQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [results, setResults] = useState({
    correctAnswers: 0,
    incorrectAnswers: [],
    totalQuestions: 0,
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const response = await axios.get(
          `http://localhost:5000/quiz/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setQuiz(response.data.quiz);
        // Initialize selectedOptions array with nulls based on number of questions
        setSelectedOptions(new Array(response.data.quiz.questions.length).fill(null));
      } catch (err) {
        toast({
          title: "Error",
          description: err.response?.data?.error || "Failed to fetch quiz",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, toast]);

  const handleOptionSelect = (value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = parseInt(value);
    setSelectedOptions(newSelectedOptions);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Check if all questions have been answered
    const unansweredQuestions = selectedOptions.findIndex(option => option === null);
    
    if (unansweredQuestions !== -1) {
      toast({
        title: "Incomplete",
        description: `Please answer question ${unansweredQuestions + 1} before submitting.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setCurrentQuestionIndex(unansweredQuestions);
      return;
    }

    // Calculate results
    let correctCount = 0;
    const wrongAnswers = [];

    quiz.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        correctCount++;
      } else {
        wrongAnswers.push({
          questionIndex: index,
          question: question.questionText,
          selectedAnswer: selectedOptions[index],
          correctAnswer: question.correctAnswer,
        });
      }
    });

    setResults({
      correctAnswers: correctCount,
      incorrectAnswers: wrongAnswers,
      totalQuestions: quiz.questions.length,
    });

    setQuizSubmitted(true);
    
    toast({
      title: "Quiz Submitted",
      description: `You got ${correctCount} out of ${quiz.questions.length} questions correct!`,
      status: correctCount === quiz.questions.length ? "success" : "info",
      duration: 5000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Center h="300px">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  if (!quiz) {
    return (
      <Alert status="error" variant="solid" borderRadius="md">
        <AlertIcon />
        <AlertTitle>Quiz not found!</AlertTitle>
        <AlertDescription>The requested quiz could not be loaded.</AlertDescription>
      </Alert>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Results screen
  if (quizSubmitted) {
    const score = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    const isPerfect = results.correctAnswers === results.totalQuestions;
    
    return (
      <Container maxW="800px" mt="6" mb="8">
        <Card variant="outline" borderWidth="1px" p="4">
          <CardBody>
            <VStack spacing="6" align="stretch">
              <Heading size="lg" textAlign="center" color="purple.600">
                Quiz Results
              </Heading>
              
              <Box textAlign="center" mb="4">
                <Heading size="xl" color={isPerfect ? "green.500" : "blue.500"}>
                  {score}%
                </Heading>
                <Text fontSize="lg" fontWeight="bold" mt="2">
                  {results.correctAnswers} out of {results.totalQuestions} correct
                </Text>
                
                {isPerfect ? (
                  <Alert status="success" variant="subtle" mt="4" borderRadius="md">
                    <AlertIcon />
                    <AlertTitle>Perfect Score!</AlertTitle>
                    <AlertDescription>Congratulations on getting all questions correct!</AlertDescription>
                  </Alert>
                ) : null}
              </Box>
              
              <Divider />
              
              {results.incorrectAnswers.length > 0 ? (
                <Box>
                  <Heading size="md" mb="4" color="red.500">
                    Questions Answered Incorrectly:
                  </Heading>
                  
                  <VStack spacing="4" align="stretch">
                    {results.incorrectAnswers.map((item) => (
                      <Card key={item.questionIndex} bg="red.50" borderRadius="md">
                        <CardBody>
                          <Text fontWeight="bold" mb="2">
                            {item.question}
                          </Text>
                          <Text color="red.600" mb="1">
                            Your answer: {quiz.questions[item.questionIndex].options[item.selectedAnswer]}
                          </Text>
                          <Text color="green.600">
                            Correct answer: {quiz.questions[item.questionIndex].options[item.correctAnswer]}
                          </Text>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </Box>
              ) : null}
              
              <Divider />
              
              <Flex justify="space-between" mt="4">
                <Button
                  onClick={() => navigate(-1)}
                  colorScheme="gray"
                >
                  Return to Quizzes
                </Button>
                <Button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setCurrentQuestionIndex(0);
                    setSelectedOptions(new Array(quiz.questions.length).fill(null));
                  }}
                  colorScheme="purple"
                >
                  Retake Quiz
                </Button>
              </Flex>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    );
  }

  // Quiz taking screen
  return (
    <Container maxW="800px" mt="20" mb="8">
      <Card variant="outline" borderWidth="1px" p="4">
        <CardBody>
          <VStack spacing="6" align="stretch">
            <Heading size="lg" color="purple.600">
              {quiz.title}
            </Heading>
            
            <Text>{quiz.description}</Text>
            
            <Box>
              <Flex justify="space-between" mb="2">
                <Text fontWeight="bold">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </Text>
                <Badge colorScheme={selectedOptions[currentQuestionIndex] !== null ? "green" : "yellow"}>
                  {selectedOptions[currentQuestionIndex] !== null ? "Answered" : "Unanswered"}
                </Badge>
              </Flex>
              <Progress 
                value={progress} 
                colorScheme="purple" 
                borderRadius="md" 
                size="sm" 
                mb="4"
              />
            </Box>
            
            <Box bg="purple.50" p="6" borderRadius="md">
              <Text fontSize="lg" fontWeight="bold" mb="4">
                {currentQuestion.questionText}
              </Text>
              
              <RadioGroup 
                onChange={handleOptionSelect} 
                value={selectedOptions[currentQuestionIndex]?.toString() || ""}
              >
                <Stack spacing="4">
                  {currentQuestion.options.map((option, index) => (
                    <Radio 
                      key={index} 
                      value={index.toString()} 
                      size="lg"
                      colorScheme="purple"
                    >
                      <Text fontSize="md">{option}</Text>
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
            
            <Flex justify="space-between" mt="4">
              <Button
                onClick={goToPreviousQuestion}
                isDisabled={currentQuestionIndex === 0}
                colorScheme="gray"
              >
                Previous
              </Button>
              
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button 
                  onClick={handleSubmitQuiz} 
                  colorScheme="green"
                  isDisabled={selectedOptions.some(option => option === null)}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button 
                  onClick={goToNextQuestion} 
                  colorScheme="purple"
                >
                  Next
                </Button>
              )}
            </Flex>
            
            {/* Navigation dots */}
            <Flex justify="center" mt="2">
              {quiz.questions.map((_, index) => (
                <Icon 
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  as={selectedOptions[index] !== null ? CheckCircleIcon : index === currentQuestionIndex ? WarningIcon : undefined}
                  boxSize={4}
                  mx="1"
                  cursor="pointer"
                  color={
                    selectedOptions[index] !== null 
                      ? "green.500" 
                      : index === currentQuestionIndex 
                        ? "yellow.500" 
                        : "gray.300"
                  }
                  borderRadius="full"
                  border={index === currentQuestionIndex ? "2px solid" : "none"}
                  borderColor={index === currentQuestionIndex ? "purple.500" : ""}
                />
              ))}
            </Flex>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default TakeQuiz;