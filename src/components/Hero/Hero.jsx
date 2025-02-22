import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

const HeroPage = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const handleClick = () => {
    navigate("/authente?page=register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <Card className="w-full md:w-1/2 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">
              Revolutionize Your Teaching with AI
            </CardTitle>
            <CardDescription className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              Create engaging, personalized lesson plans in minutes. Our AI-powered
              lesson planner saves you time and helps you focus on what matters
              most—your students.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            {loggedIn ? (
              <Button
                onClick={() => navigate("/planner")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Plan the Lesson
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Get Started for Free
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="w-full md:w-1/2 flex justify-center animate-slide-in">
          <img
            src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg"
            alt="AI Lesson Planner"
            className="rounded-lg shadow-2xl max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;