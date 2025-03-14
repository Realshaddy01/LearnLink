import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js'
import { useSelector } from "react-redux";
import axios from "axios";

const SingleAbsolute = ({ props }) => {
  const [page, setPage] = useState("left");
  const [random,setRandom] = useState(0)
  const [list, setList] = useState([]);

  const { onOpen,price,img } = props;

  const userStore = useSelector((store) => store.UserReducer);
  const { id } = useParams();
  
  const [userCourseIds, setUserCourseIds] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost:5000/users/userCourse/${user.userId}`;
  
    axios
      .get(url)
      .then((res) => {
        const courseIds = res.data.course.map(course => 
          typeof course === 'string' ? course : course._id
        );
        console.log("User course IDs:", courseIds);
        setUserCourseIds(courseIds);
      })
      .catch((err) => console.log(err));
  }, []);

  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = userStore?.token;
        const response = await axios.get(`http://localhost:5000/videos/courseVideos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.course) {
          setList(response.data.course);
        } else {
          console.error("Learnings not found in response", response.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
  
    fetchData();
  }, [id, userStore?.token]);

  const handlePayment = async () => {
    const course = {
      name: list.title,
      price: list.price * 100,
      userId: userStore.userId,
      courseId:id,
      img:list.img
    };
  
    const response = await fetch("http://localhost:5000/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
  
    const session = await response.json();
  
    const stripe = await loadStripe("pk_test_51R2SL6AK2zyptURu7kVB2vharePbEI9SVzTq4UAHfDjluWE0FBLFNA1toDznHGMXFBUc14KanxOO88dqAPbdjeyo00HKnhiiee");
    stripe.redirectToCheckout({ sessionId: session.id });
  };
  
  useEffect(()=>{
   setRandom( (Math.random()*20).toFixed())
  },[])


  return (
    <div className="xl:border text-white  xl:text-black xl:border-white xl:max-w-[280px] xl:shadow-md shadow-neutral-800  xl:bg-white">
      <div>
        <div>
          <Image src={img} />
          
        </div>
      </div>
      <div className="px-[24px]">

        <div className="flex space-x-2 place-items-baseline">
          <p className="font-bold text-sm">₹{price}</p>
          <p className="line-through text-xs ">₹{((price*(+random+100))/100).toFixed()}</p>
          <p className="text-xs">{random} off</p>
        </div>
        <div className="flex text-red-600 items-baseline space-x-1 my-2">
          {/* <BsStopwatchFill/> */}
          <p className="text-xs font-bold">52 minutes </p>
          <p className="text-xs">left at this price!</p>
        </div>
        <Box>
            <Text>{}</Text>
        </Box>
        <button
          onClick={userCourseIds.includes(id) ? null : handlePayment}
          className={`border-2 w-full py-[7px] text-sm font-bold ${
            userCourseIds.includes(id) ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
          disabled={userCourseIds.includes(id)}
        >
          {userCourseIds.includes(id) ? "Already Purchased" : "Buy this course"}
        </button>


        <div className="items-center text-[10px] space-y-1 w-full justify-center flex flex-col py-2">
          <p>30-Day Money-Back Guarantee</p>
          <p>Full Lifetime Access</p>
        </div>

      </div>
    </div>
  );
};

export default SingleAbsolute;
