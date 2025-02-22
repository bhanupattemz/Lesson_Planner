import axios from "axios";
import { toast } from "react-toastify";

const getPlannedData = async (userData) => {
    // const API_KEY = "AIzaSyDQ6qb7zPs7OJ-Ndm9EmF_iYqMbefjIsOg";
    const API_KEY="AIzaSyB_wj9TO5NTfaQDr7M1S415rApYV7z8-v8"
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: `Generate a lesson plan for the following details: 
                        Topic: ${userData.topic},
                        Grade Level: ${userData.gradeLevel},
                        Main Concept: ${userData.mainConcept},
                        Subtopics: ${userData.subtopics},
                        Materials: ${userData.materials},
                        Objectives: ${userData.objectives},
                        Lesson Outline: ${userData.lessonOutline}. 
                        Please provide the output in the following JSON format: 
                        {
                            summary: {
                                date: "2023-10-25" //this format,
                                subject: "",
                                grade: "",
                                topic: "",
                                keyConcepts: ["a", "b"]
                            },
                            materials: [
                                { name: "", required: "true/false" }
                            ],
                            objective: "text",
                            outline: [
                                {
                                    duration: "30" //min,
                                    guide: "name",
                                    remark: "remarktext"
                                }
                            ],
                            note: "text"
                        }`
                    }]
                }]
            }
        );
        const result = response.data;
        let textData = result.candidates[0].content.parts[0].text
        textData = textData.slice(7, textData.length - 4)
        let prev = JSON.parse(localStorage.getItem("prev")) || []
        prev.push(JSON.parse(textData))
        localStorage.setItem("prev", JSON.stringify(prev))
        return prev.length-1;
    } catch (err) {
        console.error("Error:", err);
        toast.error("An error occurred while generating the lesson plan!");
    }
};

export { getPlannedData };



// const data = {
//     summary: {
//         date: "",
//         subject: "",
//         grade:"",
//         topic:"",
//         keyConcepts:["a","b"]
//     },
//     materials:[
//         {name:"",required:"true/false"}
//     ],
//     objective:"text",
//     outline:[
//         {
//             duration:"30", //minutes
//             guide:"name",
//             remark:"remarktext"
//         }
//     ],
//     note:"text"
// }