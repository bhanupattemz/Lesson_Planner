import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { useAuth } from "../../AuthContext"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const { loggedIn } = useAuth()
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900">
      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-300 mb-6">
            Transform Your Teaching with AI
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-200 mb-8">
            Create engaging, personalized lesson plans in minutes. Our AI-powered
            lesson planner saves you time and helps you focus on what matters
            most—your students.
          </p>
          <div className="flex gap-4">
            {loggedIn ? 
              <Button 
                onClick={() => { navigate("/planner") }} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Plan the lesson
              </Button> :
              <Button 
                onClick={() => { navigate("/authente") }} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Get Started for Free
              </Button>
            }
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg"
            alt="AI Lesson Planner"
            className="rounded-lg shadow-2xl max-w-full h-auto"
          />
        </div>
      </section>

      <section className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-8">
            Why Choose Our AI Lesson Planner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  Personalized Lesson Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 dark:text-blue-200">
                  Generate lesson plans tailored to your students' needs, learning
                  styles, and curriculum requirements.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  Time-Saving Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 dark:text-blue-200">
                  Automate repetitive tasks like scheduling, resource allocation, and
                  progress tracking.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-300">
                  Data-Driven Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 dark:text-blue-200">
                  Get actionable insights into student performance and adjust your
                  teaching strategies accordingly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-8">
            What Educators Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-6">
                <p className="text-blue-600 dark:text-blue-200 mb-4">
                  "This AI lesson planner has completely transformed how I prepare for
                  my classes. It saves me hours every week!"
                </p>
                <p className="text-sm font-bold text-blue-500 dark:text-blue-400">- Sarah, High School Teacher</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-6">
                <p className="text-blue-600 dark:text-blue-200 mb-4">
                  "The personalized lesson plans are a game-changer. My students are
                  more engaged than ever."
                </p>
                <p className="text-sm font-bold text-blue-500 dark:text-blue-400">- John, Middle School Teacher</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-6">
                <p className="text-blue-600 dark:text-blue-200 mb-4">
                  "I love the data-driven insights. It helps me identify areas where
                  my students need more support."
                </p>
                <p className="text-sm font-bold text-blue-500 dark:text-blue-400">- Emily, Elementary Teacher</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Revolutionize Your Teaching?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of educators who are already using our AI lesson planner
            to save time and improve student outcomes.
          </p>
          {loggedIn ? 
            <Button 
              onClick={() => { navigate("/planner") }} 
              className="bg-white hover:bg-blue-50 text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-blue-300 font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Plan the Lesson
            </Button> :
            <Button 
              onClick={() => { navigate("/authente") }} 
              className="bg-white hover:bg-blue-50 text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-blue-300 font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Start For Free
            </Button>
          }
        </div>
      </section>
    </div>
  );
};

export default HomePage;