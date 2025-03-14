import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AdminNavTop from "../AdminNavTop";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Redux/AdminReducer/action";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let obj = {
    title: "",
    description: "",
    category: "",
    price: "",
    img: "",
    learnings: [],
  };

  const [detail, setDetail] = useState(obj);
  const [learningInput, setLearningInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddLearning = () => {
    if (learningInput.trim() !== "") {
      setDetail((prev) => ({
        ...prev,
        learnings: [...prev.learnings, learningInput],
      }));
      setLearningInput("");
    }
  };
  const userStore = useSelector((store) => store.UserReducer);

  const handleSubmit = () => {
    dispatch(addProduct({
    ...detail,
    userId: userStore.userId
  }));
    alert("Course Added Successfully");
    navigate("/admin/courses");
  };

  return (
    <Grid className="Nav" h={"99vh"} w="94%" gap={10} mx={"auto"}>
      <Box mt="80px">
        <AdminNavTop />
        <Box border={"2px solid gray"} borderRadius={10} p={10} h="90%">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course Title"
              name="title"
              value={detail.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter Course description"
              name="description"
              value={detail.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course Category"
              name="category"
              value={detail.category}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              placeholder="Enter Course price"
              name="price"
              value={Number(detail.price)}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course thumbnail Link"
              name="img"
              value={detail.img}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>What You'll Learn</FormLabel>
            <Input
              type="text"
              placeholder="Add a learning point"
              value={learningInput}
              onChange={(e) => setLearningInput(e.target.value)}
            />
            <Button mt={2} colorScheme="green" onClick={handleAddLearning}>
              + Add Learning
            </Button>
          </FormControl>
          <Box mt={4}>
            {detail.learnings.map((learning, index) => (
              <Box key={index} p={2} border="1px solid #ccc" mt={1} borderRadius="5px">
                {learning}
              </Box>
            ))}
          </Box>
          <Button mt={4} colorScheme="blue" size="md" isFullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AddCourse;
