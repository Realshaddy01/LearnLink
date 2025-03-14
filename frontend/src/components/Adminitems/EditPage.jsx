// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Grid,
//   Input,
//   Textarea,
//   Heading,
//   Divider,
//   Text,
//   SimpleGrid,
//   Card,
//   CardBody,
//   CardFooter,
//   Image,
//   Stack,
//   Badge,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   ModalFooter,
//   useDisclosure,
//   Spinner
// } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import "./edit.css";
// import AdminSidebar from "../AdminSidebar";
// import AdminNavTop from "../AdminNavTop";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { patchProduct } from "../../Redux/AdminReducer/action";
// import axios from "axios";

// const EditPage = () => {
//   const backgroundImageUrl =
//     "https://png.pngtree.com/background/20211217/original/pngtree-blue-round-technology-dashboard-picture-image_1598386.jpg";

//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const store = useSelector((store) => store.AdminReducer.data);
//   console.log(store);
//   const existedUser = store.filter((el) => el._id == id);
//   // console.log("existedUser",existedUser)
//   const navigate = useNavigate();

//   console.log(existedUser);

//   // console.log(id)

//   let obj = {
//     title: existedUser[0]?.title,
//     description: existedUser[0]?.description,
//     category: existedUser[0]?.category,
//     price: existedUser[0]?.price,
//     teacher: existedUser[0]?.teacher,
//     img: existedUser[0]?.img || "",
//   };

//   // console.log("obj",obj)
//   const [detail, setDetail] = useState(obj);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//     const userStore = useSelector((store) => store.UserReducer);
//   const [videoDetail, setVideoDetail] = useState({
//     title: "",
//     description: "",
//     link: "",
//     img: "",
//     video_length: 0,
//     teacher: userStore?.name,
//     teacherId: userStore?.userId,
//     role: userStore?.role
//   });

//   // Fetch videos for the course
//   useEffect(() => {
//     fetchVideos();
//   }, [id]);

//   const fetchVideos = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/videos/courseVideos/${id}`, {
//         headers: {
//           Authorization: `Bearer ${userStore?.token}`
//         }
//       });
//       if (response.data && response.data.course && response.data.course.videos) {
//         setVideos(response.data.course.videos);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetail((prev) => {
//       return { ...prev, [name]: value };
//     });
//   };

//   const handleVideoChange = (e) => {
//     const { name, value } = e.target;
//     setVideoDetail((prev) => {
//       return { ...prev, [name]: value };
//     });
//   };

//   const handleSubmit = () => {
//     //  console.log(detail);
//     dispatch(patchProduct(id, detail));
//     alert("Data Updated Successfully");
//     navigate("/admin/courses");
//   };

//   const handleAddVideo = async () => {
//     try {
//       setLoading(true);
      
//       // Make sure all required fields from the schema are included
//       const videoData = {
//         ...videoDetail,
//         // Make sure these fields are included even if they weren't changed in the form
//         teacher: userStore?.name,
//         teacherId: userStore?.userId,
//         role: userStore?.role,
//         userId: userStore?.userId,
//         username: userStore?.name
//       };
      
//       await axios.post(`http://localhost:5000/videos/add/${id}`, videoData, {
//         headers: {
//           Authorization: `Bearer ${userStore?.token}`
//         }
//       });
      
//       // Reset form and fetch updated videos
//       setVideoDetail({
//         title: "",
//         description: "",
//         link: "",
//         img: "",
//         video_length: 0,
//         teacher: userStore?.name,
//         teacherId: userStore?.userId,
//         role: userStore?.role
//       });
      
//       fetchVideos();
//       onClose();
//       alert("Video added successfully");
//     } catch (error) {
//       console.error("Error adding video:", error);
//       alert("Error adding video: " + (error.response?.data?.error || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDuration = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
//   };

//   return (
//     <Grid className="Nav" h={"99vh"} w="94%" gap={10}>
//       {/* <AdminSidebar/>  */}
//       <Box mt='80px'>
//         <AdminNavTop />
//         {/*  */}
//         <Flex
//           align="center"
//           justify="center"
//           border={"2px solid white"}
//           borderRadius={10}
//           className="background"
//           style={{
//             backgroundImage: `url(${backgroundImageUrl})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             width: "100vw",
//             height: "100vh",
//           }}
//           color="white"
//           fontWeight={"bold"}
//         >
//           <Box width={["100%", "80%", "60%", "40%"]} p={4}>
//             <FormControl>
//               <FormLabel>Course Title</FormLabel>
//               <Input
//                 type="text"
//                 border={"1px solid"}
//                 placeholder="Enter Course Title"
//                 name="title"
//                 value={detail?.title}
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Course Description</FormLabel>
//               <Textarea
//                 placeholder="Enter Course description"
//                 border={"1px solid"}
//                 name="description"
//                 value={detail?.description}
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Category</FormLabel>
//               <Input
//                 type="text"
//                 placeholder="Enter Course Category"
//                 border={"1px solid"}
//                 name="category"
//                 value={detail?.category}
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Course Price</FormLabel>
//               <Input
//                 type="number"
//                 placeholder="Enter Course price"
//                 border={"1px solid"}
//                 name="price"
//                 value={detail?.price}
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Instructor</FormLabel>
//               <Input
//                 type="text"
//                 border={"1px solid"}
//                 name="teacher"
//                 value={detail?.teacher}
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Image</FormLabel>
//               <Input
//                 type="text"
//                 border={"1px solid"}
//                 name="img"
//                 value={detail?.img}
//                 onChange={handleChange}
//               />
//             </FormControl>

//             <Button
//               mt={4}
//               colorScheme="blue"
//               size="md"
//               isFullWidth
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>
            
//             {/* Added Video Management Button */}
//             <Button
//               mt={4}
//               colorScheme="green"
//               size="md"
//               isFullWidth
//               onClick={() => {
//                 onOpen();
//                 fetchVideos(); // Refresh videos when opening modal
//               }}
//             >
//               Manage Videos
//             </Button>
//             <Link
//               to={`/admin/course/add-quiz/${id}`}
//             >
//               Add quiz
//             </Link>
//           </Box>
//         </Flex>
//       </Box>

//       {/* Video Management Modal */}
//       <Modal isOpen={isOpen} onClose={onClose} size="xl">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Course Videos</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* Display existing videos */}
//             {loading ? (
//               <Flex justify="center" my={4}>
//                 <Spinner />
//               </Flex>
//             ) : videos.length > 0 ? (
//               <>
//                 <Heading size="sm" mb={3}>Existing Videos</Heading>
//                 <SimpleGrid columns={[1, 2]} spacing={4} mb={6}>
//                   {videos.map((video) => (
//                     <Card key={video._id}>
//                       <Image
//                         src={video.img || "https://via.placeholder.com/300x200?text=Video+Thumbnail"}
//                         alt={video.title}
//                         height="120px"
//                         objectFit="cover"
//                       />
//                       <CardBody p={3}>
//                         <Heading size="xs">{video.title}</Heading>
//                         <Text fontSize="xs" mt={1} noOfLines={2}>{video.description}</Text>
//                         <Text fontSize="xs" mt={1}>Duration: {formatDuration(video.video_length)}</Text>
//                       </CardBody>
//                     </Card>
//                   ))}
//                 </SimpleGrid>
//               </>
//             ) : (
//               <Text mb={4}>No videos added to this course yet.</Text>
//             )}

//             <Divider my={4} />
            
//             {/* Add new video form */}
//             <Heading size="sm" mb={3}>Add New Video</Heading>
//             <FormControl mb={3} isRequired>
//               <FormLabel>Video Title</FormLabel>
//               <Input 
//                 name="title" 
//                 value={videoDetail.title} 
//                 onChange={handleVideoChange} 
//                 placeholder="Enter video title"
//               />
//             </FormControl>
//             <FormControl mb={3} isRequired>
//               <FormLabel>Description</FormLabel>
//               <Textarea 
//                 name="description" 
//                 value={videoDetail.description} 
//                 onChange={handleVideoChange} 
//                 placeholder="Enter video description"
//               />
//             </FormControl>
//             <FormControl mb={3} isRequired>
//               <FormLabel>Video Link</FormLabel>
//               <Input 
//                 name="link" 
//                 value={videoDetail.link} 
//                 onChange={handleVideoChange} 
//                 placeholder="Enter video URL (YouTube, Vimeo, etc.)"
//               />
//             </FormControl>
//             <FormControl mb={3} isRequired>
//               <FormLabel>Thumbnail Image URL</FormLabel>
//               <Input 
//                 name="img" 
//                 value={videoDetail.img} 
//                 onChange={handleVideoChange} 
//                 placeholder="Enter thumbnail image URL"
//               />
//             </FormControl>
//             <FormControl mb={3} isRequired>
//               <FormLabel>Video Length (in seconds)</FormLabel>
//               <Input 
//                 name="video_length" 
//                 type="number" 
//                 value={videoDetail.video_length} 
//                 onChange={handleVideoChange} 
//                 placeholder="Enter video duration in seconds"
//               />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleAddVideo} isLoading={loading}>
//               Add Video
//             </Button>
//             <Button variant="ghost" onClick={onClose}>Done</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Grid>
//   );
// };

// export default EditPage;
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
  Heading,
  Divider,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Container,
  VStack,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Spinner,
  IconButton,
  Badge
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import AdminNavTop from "../AdminNavTop";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { patchProduct } from "../../Redux/AdminReducer/action";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const store = useSelector((store) => store.AdminReducer.data);
  const userStore = useSelector((store) => store.UserReducer);
  
  const existedUser = store.filter((el) => el._id === id);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [detail, setDetail] = useState({
    title: existedUser[0]?.title || "",
    description: existedUser[0]?.description || "",
    category: existedUser[0]?.category || "",
    price: existedUser[0]?.price || 0,
    teacher: existedUser[0]?.teacher || "",
    img: existedUser[0]?.img || "",
  });
  
  const [videoDetail, setVideoDetail] = useState({
    title: "",
    description: "",
    link: "",
    img: "",
    video_length: 0,
    teacher: userStore?.name || "",
    teacherId: userStore?.userId || "",
    role: userStore?.role || ""
  });

  useEffect(() => {
    fetchVideos();
  }, [id]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/videos/courseVideos/${id}`, {
        headers: {
          Authorization: `Bearer ${userStore?.token}`
        }
      });
      if (response.data && response.data.course && response.data.course.videos) {
        setVideos(response.data.course.videos);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "Error fetching videos",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    setVideoDetail((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    dispatch(patchProduct(id, detail));
    toast({
      title: "Success",
      description: "Course updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/admin/courses");
  };

  const handleAddVideo = async () => {
    try {
      setLoading(true);
      
      const videoData = {
        ...videoDetail,
        teacher: userStore?.name,
        teacherId: userStore?.userId,
        role: userStore?.role,
        userId: userStore?.userId,
        username: userStore?.name
      };
      
      await axios.post(`http://localhost:5000/videos/add/${id}`, videoData, {
        headers: {
          Authorization: `Bearer ${userStore?.token}`
        }
      });
      setVideoDetail({
        title: "",
        description: "",
        link: "",
        img: "",
        video_length: 0,
        teacher: userStore?.name,
        teacherId: userStore?.userId,
        role: userStore?.role
      });
      
      fetchVideos();
      onClose();
      toast({
        title: "Success",
        description: "Video added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding video:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <AdminNavTop />
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg">Edit Course</Heading>

          <Card shadow="md" borderRadius="lg" p={0} overflow="hidden">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Course Title</FormLabel>
                  <Input
                    name="title"
                    value={detail.title}
                    onChange={handleChange}
                    placeholder="Enter Course Title"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Course Description</FormLabel>
                  <Textarea
                    name="description"
                    value={detail.description}
                    onChange={handleChange}
                    placeholder="Enter Course description"
                    minHeight="120px"
                  />
                </FormControl>
                
                <SimpleGrid columns={[1, null, 2]} spacing={4}>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Input
                      name="category"
                      value={detail.category}
                      onChange={handleChange}
                      placeholder="Enter Course Category"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Course Price</FormLabel>
                    <Input
                      type="number"
                      name="price"
                      value={detail.price}
                      onChange={handleChange}
                      placeholder="Enter Course price"
                    />
                  </FormControl>
                </SimpleGrid>
                
                <SimpleGrid columns={[1, null, 2]} spacing={4}>
                  <FormControl>
                    <FormLabel>Instructor</FormLabel>
                    <Input
                      name="teacher"
                      value={detail.teacher}
                      onChange={handleChange}
                      placeholder="Enter instructor name"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      name="img"
                      value={detail.img}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                    />
                  </FormControl>
                </SimpleGrid>
                
                <HStack spacing={4} justify="space-between" mt={4}>
                  <Button leftIcon={<EditIcon />} colorScheme="blue" onClick={handleSubmit}>
                    Update Course
                  </Button>
                  
                  <HStack>
                    <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onOpen}>
                      Manage Videos
                    </Button>
                    
                    <Button 
                      as={Link} 
                      to={`/admin/course/add-quiz/${id}`} 
                      colorScheme="purple"
                    >
                      Add Quiz
                    </Button>
                  </HStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
          
          {detail.img && (
            <Card shadow="md" borderRadius="lg" overflow="hidden">
              <Box position="relative">
                <Image 
                  src={detail.img || "https://via.placeholder.com/800x400?text=Course+Thumbnail"} 
                  alt={detail.title}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <Badge 
                  position="absolute" 
                  top={2} 
                  right={2} 
                  colorScheme="green"
                  px={2} 
                  py={1} 
                  borderRadius="md"
                >
                  ${detail.price}
                </Badge>
              </Box>
              <CardBody>
                <Heading size="md" mb={2}>{detail.title}</Heading>
                <Text color="gray.600" noOfLines={3}>{detail.description}</Text>
                <HStack mt={4}>
                  <Badge colorScheme="blue">{detail.category}</Badge>
                  <Badge colorScheme="purple">By {detail.teacher}</Badge>
                  <Badge colorScheme="orange">{videos.length} videos</Badge>
                </HStack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course Videos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Flex justify="center" my={4}>
                <Spinner size="lg" color="blue.500" />
              </Flex>
            ) : videos.length > 0 ? (
              <>
                <Heading size="md" mb={4}>Existing Videos</Heading>
                <SimpleGrid columns={[1, 2]} spacing={4} mb={6}>
                  {videos.map((video) => (
                    <Card key={video._id} shadow="md" borderRadius="md" overflow="hidden">
                      <Image
                        src={video.img || "https://via.placeholder.com/300x200?text=Video+Thumbnail"}
                        alt={video.title}
                        height="120px"
                        objectFit="cover"
                      />
                      <CardBody p={3}>
                        <Heading size="xs" noOfLines={1}>{video.title}</Heading>
                        <Text fontSize="xs" mt={1} noOfLines={2} color="gray.600">
                          {video.description}
                        </Text>
                        <Badge mt={2} colorScheme="blue" fontSize="xs">
                          {formatDuration(video.video_length)}
                        </Badge>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </>
            ) : (
              <Box 
                textAlign="center" 
                py={10} 
                px={6}
                borderRadius="md"
                bg="gray.50"
              >
                <Text fontSize="lg" mb={4}>No videos added to this course yet.</Text>
                <Text color="gray.500">Add your first video below.</Text>
              </Box>
            )}

            <Divider my={6} />
            
            <Heading size="md" mb={4}>Add New Video</Heading>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Video Title</FormLabel>
                <Input 
                  name="title" 
                  value={videoDetail.title} 
                  onChange={handleVideoChange} 
                  placeholder="Enter video title"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  name="description" 
                  value={videoDetail.description} 
                  onChange={handleVideoChange} 
                  placeholder="Enter video description"
                  rows={3}
                />
              </FormControl>
              
              <SimpleGrid columns={[1, null, 2]} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Video Link</FormLabel>
                  <Input 
                    name="link" 
                    value={videoDetail.link} 
                    onChange={handleVideoChange} 
                    placeholder="Enter video URL"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Video Length (in seconds)</FormLabel>
                  <Input 
                    name="video_length" 
                    type="number" 
                    value={videoDetail.video_length} 
                    onChange={handleVideoChange} 
                    placeholder="Duration in seconds"
                  />
                </FormControl>
              </SimpleGrid>
              
              <FormControl isRequired>
                <FormLabel>Thumbnail Image URL</FormLabel>
                <Input 
                  name="img" 
                  value={videoDetail.img} 
                  onChange={handleVideoChange} 
                  placeholder="Enter thumbnail image URL"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={handleAddVideo} 
              isLoading={loading}
              leftIcon={<AddIcon />}
            >
              Add Video
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditPage;