import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AdminNavTop from "../AdminNavTop";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/AdminReducer/action";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let obj = {
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    role: "user", 
  };

  const [detail, setDetail] = useState(obj);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    dispatch(addUser(detail));
    alert("User Added Successfully");
    navigate("/admin/users");
  };

  return (
    <Grid className="Nav" h={"99vh"} w="94%" gap={10} mx={"auto"}>
      {/* <AdminSidebar/>  */}
      <Box  mt="80px">
        <AdminNavTop />

        <Box
         
          border={"2px solid gray"}
          borderRadius={10}
          p={10}
          h="90%"
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={detail.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Textarea
              type="email"
              placeholder="Enter Email"
              name="email"
              value={detail.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={detail.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="confirmPassword"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              value={detail.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={detail.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="teacher">Teacher</option>
            </Select>
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            size="md"
            isFullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AddUser;
