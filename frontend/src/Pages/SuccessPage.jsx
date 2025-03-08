import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const userId = searchParams.get("userId");
  const userStore = useSelector((store) => store.UserReducer);
  const navigate = useNavigate();
  
  const [status, setStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    const addCourse = async () => {
      if (!courseId || !userId) {
        setStatus("error");
        setErrorMessage("Missing course or user information");
        return;
      }

      try {
        setStatus("processing");
        const token = userStore?.token;
        
        if (!token) {
          setStatus("error");
          setErrorMessage("Authentication token missing");
          return;
        }

        const response = await axios.post(
          `http://localhost:5000/users/addCourse/${courseId}`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data) {
          setStatus("success");
          
          const redirectDelay = 3;
          setSecondsLeft(redirectDelay);
          
          const interval = setInterval(() => {
            setSecondsLeft(prev => {
              const newValue = prev - 1;
              if (newValue <= 0) {
                clearInterval(interval);
                navigate('/learnlink');
              }
              return newValue;
            });
            
            setProgress(prev => prev + (100 / redirectDelay));
          }, 1000);
          
          return () => clearInterval(interval);
        } else {
          throw new Error("Received empty response from server");
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error.response?.data?.message || 
          error.message || 
          "Failed to enroll in course. Please try again."
        );
        console.error("Error adding course:", error);
      }
    };

    addCourse();
  }, [courseId, userId, navigate, userStore?.token]);

  const renderContent = () => {
    switch (status) {
      case "processing":
        return (
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin mx-auto"></div>
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Processing Your Enrollment</h2>
            <p className="mt-2 text-gray-600">Please wait while we complete your registration...</p>
          </div>
        );
      
      case "success":
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">You've been successfully enrolled in the course.</p>
            <p className="mt-4 text-sm text-gray-500">Redirecting to your learning dashboard in {secondsLeft} seconds...</p>
            
            <div className="w-full h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <button 
              onClick={() => navigate('/learnlink')} 
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Go to Dashboard Now
            </button>
          </div>
        );
      
      case "error":
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Something Went Wrong</h2>
            <p className="mt-2 text-gray-600">{errorMessage}</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Try Again
              </button>
              <button 
                onClick={() => navigate('/support')} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Contact Support
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
        <div className="p-8">
          {renderContent()}
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">© LearnLink 2025</p>
              <div className="flex space-x-4">
                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Help</button>
                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy</button>
                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;