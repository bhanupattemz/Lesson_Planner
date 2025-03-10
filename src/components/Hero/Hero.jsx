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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <Card className="w-full md:w-1/2 shadow-lg animate-fade-in backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-blue-800 dark:text-blue-300">
              Revolutionize Your Teaching with AI
            </CardTitle>
            <CardDescription className="text-lg text-blue-600 dark:text-blue-200 mt-4">
              Create engaging, personalized lesson plans in minutes. Our AI-powered
              lesson planner saves you time and helps you focus on what matters
              most—your students.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            {loggedIn ? (
              <Button
                onClick={() => navigate("/planner")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Plan the Lesson
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
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