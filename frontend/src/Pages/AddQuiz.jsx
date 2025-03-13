import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  VStack,
  HStack,
  Text,
  IconButton,
  useToast,
  Container,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Select,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import QuizList from "../components/QuizList";

const AddQuiz = () => {
  const { id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
    const userStore = useSelector((store) => store.UserReducer);

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        options: ["", ""],
        correctAnswer: 0,
      },
    ],
  });

  // Add a new question
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          questionText: "",
          options: ["", ""],
          correctAnswer: 0,
        },
      ],
    });
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Add an option to a question
  const addOption = (questionIndex) => {
    if (quizData.questions[questionIndex].options.length >= 4) {
      toast({
        title: "Maximum options reached",
        description: "A question can have a maximum of 4 options",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options.push("");
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Remove an option from a question
  const removeOption = (questionIndex, optionIndex) => {
    if (quizData.questions[questionIndex].options.length <= 2) {
      toast({
        title: "Minimum options required",
        description: "A question must have at least 2 options",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    
    // If the correct answer was the removed option or after it, adjust the correct answer
    if (updatedQuestions[questionIndex].correctAnswer >= optionIndex) {
      updatedQuestions[questionIndex].correctAnswer = Math.max(0, updatedQuestions[questionIndex].correctAnswer - 1);
    }
    
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Handle input changes for quiz title and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  // Handle input changes for question text
  const handleQuestionTextChange = (questionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].questionText = value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Handle input changes for option text
  const handleOptionTextChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Handle changes for correct answer
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(value);
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });
  };

  // Submit the quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate quiz data
    if (!quizData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a quiz title",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate each question
    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      
      if (!question.questionText.trim()) {
        toast({
          title: "Question text required",
          description: `Please enter text for question ${i + 1}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      // Check if all options have text
      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].trim()) {
          toast({
            title: "Option text required",
            description: `Please enter text for all options in question ${i + 1}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }
    }

    setLoading(true);
    
    try {
      const token = userStore?.token;
      console.log(id)
      const response = await axios.post(
        "http://localhost:5000/quiz/add",
        {
          courseId: id,
          ...quizData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Quiz added",
        description: "Quiz has been successfully added to the course",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setQuizData({
        title: "",
        description: "",
        questions: [
          {
            questionText: "",
            options: ["", ""],
            correctAnswer: 0,
          },
        ],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to add quiz",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxW="800px" mt="90px" mb="4rem">
        <Heading mb="4">Add Quiz to Course</Heading>
        <Text mb="6">
          Create a quiz for this course by adding questions and options. Each
          question must have at least 2 options.
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing="6" align="stretch">
            <FormControl isRequired>
              <FormLabel>Quiz Title</FormLabel>
              <Input
                name="title"
                value={quizData.title}
                onChange={handleInputChange}
                placeholder="Enter quiz title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={quizData.description}
                onChange={handleInputChange}
                placeholder="Enter quiz description"
              />
            </FormControl>

            <Divider my="4" />

            <Heading size="md" mb="2">
              Questions
            </Heading>

            {quizData.questions.map((question, questionIndex) => (
              <Box
                key={questionIndex}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                mb="4"
              >
                <VStack spacing="4" align="stretch">
                  <HStack justifyContent="space-between">
                    <Heading size="sm">Question {questionIndex + 1}</Heading>
                    {quizData.questions.length > 1 && (
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeQuestion(questionIndex)}
                        aria-label="Remove question"
                      />
                    )}
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel>Question Text</FormLabel>
                    <Textarea
                      value={question.questionText}
                      onChange={(e) =>
                        handleQuestionTextChange(
                          questionIndex,
                          e.target.value
                        )
                      }
                      placeholder="Enter your question"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Options</FormLabel>
                    <VStack spacing="2" align="stretch">
                      {question.options.map((option, optionIndex) => (
                        <HStack key={optionIndex}>
                          <Radio
                            isChecked={question.correctAnswer === optionIndex}
                            onChange={() =>
                              handleCorrectAnswerChange(
                                questionIndex,
                                optionIndex
                              )
                            }
                            value={optionIndex.toString()}
                          />
                          <Input
                            value={option}
                            onChange={(e) =>
                              handleOptionTextChange(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          {question.options.length > 2 && (
                            <IconButton
                              icon={<FaTrash />}
                              variant="ghost"
                              onClick={() =>
                                removeOption(questionIndex, optionIndex)
                              }
                              aria-label="Remove option"
                            />
                          )}
                        </HStack>
                      ))}
                    </VStack>

                    <Text fontSize="sm" mt="1" color="gray.500">
                      Select the radio button next to the correct answer
                    </Text>

                    {question.options.length < 4 && (
                      <Button
                        leftIcon={<FaPlus />}
                        mt="2"
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(questionIndex)}
                      >
                        Add Option
                      </Button>
                    )}
                  </FormControl>
                </VStack>
              </Box>
            ))}

            <Button
              leftIcon={<FaPlus />}
              onClick={addQuestion}
              variant="outline"
              colorScheme="blue"
            >
              Add Another Question
            </Button>

            <Button
              mt="4"
              colorScheme="purple"
              type="submit"
              isLoading={loading}
            >
              Save Quiz
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default AddQuiz;