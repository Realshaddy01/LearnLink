import React from 'react';
import { Book, Users, Award, Video, FileText, Settings, VideoIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MinimalDashboard = () => {
  return (
    <div className="min-h-screen bg-white p-8 mt-[90px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Learn Link Admin</h1>
        <p className="text-gray-500 mt-1">Manage your learning platform with ease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardPanel 
          title="Courses" 
          icon={<Book size={24} />}
          color="blue"
          path='/admin/courses'
        />
        
        <DashboardPanel 
          title="Students" 
          icon={<Users size={24} />}
          color="purple"
          path={'/admin/users'}
        />
        
        <DashboardPanel 
          title="All Videos" 
          icon={<VideoIcon size={24} />}
          color="green"
          path={'/admin/videos'}
        />
        
        <DashboardPanel 
          title="Account" 
          icon={<User size={24} />}
          color="orange"
          path={'/profile'}
        />
      </div>
    </div>
  );
};

// Simple Dashboard Panel Component
const DashboardPanel = ({ title, icon, color,path }) => {
  const navigate = useNavigate()
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    green: "bg-green-50 border-green-200 text-green-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-600",
    gray: "bg-gray-50 border-gray-200 text-gray-600",
  };
  
  return (
    <div 
    onClick={()=>navigate(path)}
    className={`rounded-xl ${colorMap[color]} border p-6 flex flex-col items-center justify-center hover:shadow-md transition cursor-pointer`}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm mt-2 text-center">Manage your {title.toLowerCase()}</p>
    </div>
  );
};

export default MinimalDashboard;