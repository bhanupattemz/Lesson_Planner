import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import { Button } from "@/components/ui/button";

export default function LessonPlan() {
  const { _id } = useParams();
  const contentRef = useRef();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});

  useEffect(() => {
    const prev = localStorage.getItem("prev") || "[]";
    let data = JSON.parse(prev);
    if (_id && data.length > _id) {
      setTopic(data[_id]);
    } else {
      toast.error("Topic Not Found!");
      navigate("/home");
    }
  }, [_id]);

  const generatePDF = () => {
    const content = contentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    domtoimage.toPng(content).then((imgData) => {
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const imgWidth = content.offsetWidth;
        const imgHeight = content.offsetHeight;
        let ratio = imgWidth / pdfWidth;
        let scaledHeight = imgHeight / ratio;

        let y = 0;
        while (y < scaledHeight) {
          pdf.addImage(imgData, "PNG", 0, -y, pdfWidth, scaledHeight);
          y += pdfHeight;
          if (y < scaledHeight) {
            pdf.addPage();
          }
        }
        pdf.save("lesson-plan.pdf");
      };
    });
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-800 rounded-lg p-6" ref={contentRef}>
          <h1 className="text-3xl font-bold mb-4 text-blue-800 dark:text-blue-300">Topic: {topic.summary?.topic}</h1>

          <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold">Summary</h2>
          </div>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/50">
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Date</th>
                <td className="border border-blue-200 dark:border-blue-700 p-2 text-left">{topic.summary?.date}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Subject</th>
                <td className="border border-blue-200 dark:border-blue-700 p-2">{topic.summary?.subject}</td>
              </tr>
              <tr>
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Year Group or Grade Level</th>
                <td className="border border-blue-200 dark:border-blue-700 p-2">{topic.summary?.grade}</td>
              </tr>
              <tr>
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Main Topic or Unit</th>
                <td className="border border-blue-200 dark:border-blue-700 p-2">{topic.summary?.topic}</td>
              </tr>
              <tr>
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Subtopics or Key Concepts</th>
                <td className="border border-blue-200 dark:border-blue-700 p-2">{topic.summary?.keyConcepts.join(", ")}</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold">Materials Needed</h2>
          </div>

          <div className="mb-6">
            {topic.materials && topic.materials.map((item, inx) => {
              return (
                <p className="text-sm mb-2" key={inx}>
                  {item.required == "true" ?
                    <span className="inline-block w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-center mr-2">✔</span> :
                    <span className="inline-block w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-center mr-2"> </span>}
                  {item.name}
                </p>
              );
            })}
          </div>

          <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold">Learning Objectives</h2>
          </div>

          <p className="text-sm mb-6 text-blue-800 dark:text-blue-200">
            {topic.objective}
          </p>

          <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold">Lesson Outline</h2>
          </div>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/50">
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Duration</th>
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Guide</th>
                <th className="border border-blue-200 dark:border-blue-700 p-2 text-left text-blue-700 dark:text-blue-300">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {topic.outline && topic.outline.map((item, inx) => {
                return (
                  <tr className="bg-blue-50/50 dark:bg-blue-900/30" key={inx}>
                    <td className="border border-blue-200 dark:border-blue-700 p-2">{item.duration} minutes</td>
                    <td className="border border-blue-200 dark:border-blue-700 p-2">{item.guide}</td>
                    <td className="border border-blue-200 dark:border-blue-700 p-2">{item.remark}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold">Notes</h2>
          </div>

          <div className="mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-200">{topic.note}</p>
          </div>
        </div>

        <div className="flex gap-2 p-4 justify-center">
          <Button
            variant="default"
            onClick={() => { navigate(`/topic/edit/${_id}`); }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            onClick={generatePDF}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </main>
  );
}