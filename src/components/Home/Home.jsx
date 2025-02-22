import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { useAuth } from "../../AuthContext"
import { useNavigate } from "react-router-dom"
const HomePage = () => {
  const { loggedIn } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your Teaching with AI
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Create engaging, personalized lesson plans in minutes. Our AI-powered
            lesson planner saves you time and helps you focus on what matters
            most—your students.
          </p>
          <div className="flex gap-4">
            {loggedIn ? <Button onClick={() => { navigate("/planner") }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              Plan the lesson
            </Button> :
              <Button onClick={() => { navigate("/authente") }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                Get Started for Free
              </Button>}
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

      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Why Choose Our AI Lesson Planner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Personalized Lesson Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Generate lesson plans tailored to your students' needs, learning
                  styles, and curriculum requirements.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Time-Saving Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Automate repetitive tasks like scheduling, resource allocation, and
                  progress tracking.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Data-Driven Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Get actionable insights into student performance and adjust your
                  teaching strategies accordingly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            What Educators Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "This AI lesson planner has completely transformed how I prepare for
                  my classes. It saves me hours every week!"
                </p>
                <p className="text-sm font-bold text-blue-600">- Sarah, High School Teacher</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "The personalized lesson plans are a game-changer. My students are
                  more engaged than ever."
                </p>
                <p className="text-sm font-bold text-blue-600">- John, Middle School Teacher</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "I love the data-driven insights. It helps me identify areas where
                  my students need more support."
                </p>
                <p className="text-sm font-bold text-blue-600">- Emily, Elementary Teacher</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Revolutionize Your Teaching?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of educators who are already using our AI lesson planner
            to save time and improve student outcomes.
          </p>
          {loggedIn ? <Button onClick={() => { navigate("/planner") }} className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all">
            Plan the Lesson
          </Button> :
            <Button onClick={() => { navigate("/authente") }} className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all">
              Start For Free
            </Button>}

        </div>
      </section>
    </div>
  );
};

export default HomePage;