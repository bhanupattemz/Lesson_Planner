import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../AuthContext"
export default function About() {
    const navigate = useNavigate();
    const { loggedIn } = useAuth()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <section className="flex items-center justify-center py-32 px-5 bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white text-center">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">About Us</h1>
                    <p className="text-lg md:text-xl opacity-90">
                        We are on a mission to revolutionize education by empowering educators with cutting-edge AI tools.
                    </p>
                </div>
            </section>

            <section className="py-20 px-5 bg-card text-card-foreground text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#3498db]">Our Mission</h2>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                        At <strong>AI Lesson Planner</strong>, we believe that every educator deserves the tools to create engaging, personalized, and effective lesson plans. Our mission is to simplify the teaching process, save time, and help educators focus on what truly matters—their students.
                    </p>
                </div>
            </section>

            <section className="py-20 px-5 bg-background text-foreground text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#3498db]">Our Story</h2>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                        Founded in 2023 by a team of educators and technologists, AI Lesson Planner was born out of a shared passion for improving education. We saw firsthand the challenges teachers face in creating lesson plans that cater to diverse learning needs. With the power of AI, we set out to create a solution that would make teaching more efficient and impactful.
                    </p>
                </div>
            </section>

            <section className="py-20 px-5 bg-card text-card-foreground text-center">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#3498db]">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {[
                            { name: "John Doe", role: "Co-Founder & CEO" },
                            { name: "Jane Smith", role: "Co-Founder & CTO" },
                            { name: "Emily Johnson", role: "Head of Product" }
                        ].map((member, index) => (
                            <Card key={index} className="w-full max-w-[280px] group hover:-translate-y-2 transition-all duration-300">
                                <CardContent className="p-6 text-center">
                                    <img
                                        src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg"
                                        alt={member.name}
                                        className="w-[150px] h-[150px] rounded-full mx-auto mb-5 object-cover border-4 border-[#3498db]"
                                    />
                                    <h3 className="text-xl font-bold mb-2 text-[#3498db]">{member.name}</h3>
                                    <p className="text-muted-foreground">{member.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-5 bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-5">Join the Revolution</h2>
                    <p className="text-lg md:text-xl opacity-90 mb-8">
                        Ready to transform your teaching experience? Sign up today and start creating lesson plans with ease.
                    </p>
                    {!loggedIn && <Button
                        onClick={() => navigate("/authente?page=register")}
                        variant="secondary"
                        className="px-8 py-6 text-lg font-semibold bg-white text-[#3498db] hover:bg-[#f5f7fa] hover:-translate-y-1 transition-all duration-300"
                    >
                        Get Started
                    </Button>}
                </div>
            </section>
        </div>
    );
}