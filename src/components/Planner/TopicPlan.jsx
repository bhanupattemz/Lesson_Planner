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
    domtoimage.toPng(content).then((imgData) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (content.offsetHeight * pdfWidth) / content.offsetWidth;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("lesson-plan.pdf");
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-card text-card-foreground p-6" ref={contentRef}>
        <h1 className="text-3xl font-bold mb-4">Topic: {topic.summary?.topic}</h1>

        <div className="bg-[#3b82f6] text-white p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold">Summary</h2>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2 text-left">Date</th>
              <td className="border border-border p-2 text-left">{topic.summary?.date}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-border p-2 text-left">Subject</th>
              <td className="border border-border p-2">{topic.summary?.subject}</td>
            </tr>
            <tr>
              <th className="border border-border p-2 text-left">Year Group or Grade Level</th>
              <td className="border border-border p-2">{topic.summary?.grade}</td>
            </tr>
            <tr>
              <th className="border border-border p-2 text-left">Main Topic or Unit</th>
              <td className="border border-border p-2">{topic.summary?.topic}</td>
            </tr>
            <tr>
              <th className="border border-border p-2 text-left">Subtopics or Key Concepts</th>
              <td className="border border-border p-2">{topic.summary?.keyConcepts.join(", ")}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-[#3b82f6] text-white p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold">Materials Needed</h2>
        </div>

        <div className="mb-6">
          {topic.materials && topic.materials.map((item, inx) => {
            return (
              <p className="text-sm mb-2" key={inx}>
                {item.required == "true" ?
                  <span className="inline-block w-4 h-4 bg-primary/20 text-primary rounded-full text-center mr-2">✔</span> :
                  <span className="inline-block w-4 h-4 bg-primary/20 text-primary rounded-full text-center mr-2"> </span>}
                {item.name}
              </p>
            );
          })}
        </div>

        <div className="bg-[#3b82f6] text-white p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold">Learning Objectives</h2>
        </div>

        <p className="text-sm mb-6">
          {topic.objective}
        </p>

        <div className="bg-[#3b82f6] text-white p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold">Lesson Outline</h2>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-muted">
              <th className="border border-primary p-2 text-left">Duration</th>
              <th className="border border-primary p-2 text-left">Guide</th>
              <th className="border border-primary p-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {topic.outline && topic.outline.map((item, inx) => {
              return (
                <tr className="bg-muted/50" key={inx}>
                  <td className="border border-primary p-2">{item.duration} minutes</td>
                  <td className="border border-primary p-2">{item.guide}</td>
                  <td className="border border-primary p-2">{item.remark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="bg-[#3b82f6] text-white p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold">Notes</h2>
        </div>

        <div className="mb-6">
          <p className="text-sm">{topic.note}</p>
        </div>
      </div>

      <div className="flex gap-2 p-4">
        <Button
          variant="default"
          onClick={() => { navigate(`/topic/edit/${_id}`); }}
        >
          Edit
        </Button>
        <Button
          variant="secondary"
          onClick={generatePDF}
        >
          Download PDF
        </Button>
      </div>
    </main>
  );
}