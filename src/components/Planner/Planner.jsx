import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAuth } from '../../AuthContext';
import { Button } from "../ui/button";
import loadImg from "../../assets/pre.svg"
import { toast } from "react-toastify"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { getPlannedData } from "../../functionalities";

export default function Planner() {
    const { loggedIn } = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: "",
        gradeLevel: "",
        mainConcept: "",
        subtopics: "",
        materials: "",
        objectives: "",
        lessonOutline: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const result = await getPlannedData(formData);
        if (result) {
            navigate(`/topic/${result}`);
        } else {
            toast.error("Something wents Wrong!")
        }
        setLoading(false)
    };

    useEffect(() => {
        if (!loggedIn || loggedIn == "false") {
            navigate("/authente");
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900 flex justify-center">
                <img src={loadImg} alt="loading-img" />
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900">
            <div className="flex flex-col lg:flex-row w-[90%] mx-auto p-4 lg:p-8 gap-8">
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-blue-200 dark:border-blue-800">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-semibold text-blue-800 dark:text-blue-300">
                                Lesson Plan Form
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Topic
                                    </label>
                                    <Input
                                        type="text"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        placeholder="Enter the topic"
                                        className="border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Grade Level
                                    </label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFormData(prev => ({ ...prev, gradeLevel: value }))
                                        }
                                    >
                                        <SelectTrigger className="border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-500">
                                            <SelectValue placeholder="Select Grade Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                                            <SelectItem value="Grade 1">Grade 1</SelectItem>
                                            <SelectItem value="Grade 2">Grade 2</SelectItem>
                                            <SelectItem value="Grade 3">Grade 3</SelectItem>
                                            <SelectItem value="Grade 4">Grade 4</SelectItem>
                                            <SelectItem value="Grade 5">Grade 5</SelectItem>
                                            <SelectItem value="Middle School">Middle School</SelectItem>
                                            <SelectItem value="High School">High School</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Main Concept & Subtopics
                                    </label>
                                    <Textarea
                                        name="mainConcept"
                                        value={formData.mainConcept}
                                        onChange={handleChange}
                                        placeholder="Describe the main concept and subtopics"
                                        className="min-h-[100px] resize-none border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Materials Needed
                                    </label>
                                    <Textarea
                                        name="materials"
                                        value={formData.materials}
                                        onChange={handleChange}
                                        placeholder="List the materials needed"
                                        className="min-h-[100px] resize-none border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Learning Objectives
                                    </label>
                                    <Textarea
                                        name="objectives"
                                        value={formData.objectives}
                                        onChange={handleChange}
                                        placeholder="Describe the learning objectives"
                                        className="min-h-[100px] resize-none border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Lesson Outline
                                    </label>
                                    <Textarea
                                        name="lessonOutline"
                                        value={formData.lessonOutline}
                                        onChange={handleChange}
                                        placeholder="Provide a structured lesson outline"
                                        className="min-h-[100px] resize-none border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-500"
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Submit Lesson Plan
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                    <img
                        src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg"
                        alt="time-img"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </main>
    );
}