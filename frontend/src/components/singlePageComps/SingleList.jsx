import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((store) => store.UserReducer);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = userStore?.token;
        const response = await axios.get(`http://localhost:5000/videos/courseVideos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.course && response.data.course.learnings) {
          setList(response.data.course.learnings);
        } else {
          console.error("Learnings not found in response", response.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id, userStore?.token]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse bg-gray-200 rounded-lg w-full max-w-2xl h-64"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full px-4 md:px-0">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-100 my-8">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-1 rounded-md mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            What you'll learn
          </h3>
          
          {list.length === 0 ? (
            <p className="text-gray-500 italic">No learning objectives listed for this course.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
              {list.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="mt-1 flex-shrink-0 bg-green-100 text-green-600 p-1 rounded-full mr-3 transform group-hover:scale-110 transition-transform">
                    <FaCheck className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleList;