import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../AuthContext";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

export default function PrevPlans() {
    const [prev, setPrev] = useState([]);
    const { loggedIn, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn){
            navigate("/authente")
        }
        const data = localStorage.getItem("prev");
        if (data) {
            setPrev(JSON.parse(data));
        }
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900">
            <div className="fixed inset-0 bg-cover bg-center -z-10 opacity-25 dark:opacity-10"
                style={{ backgroundImage: `url('https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg')` }}>
            </div>
            
            <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
                {prev && prev.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5">
                        {prev.map((topic, inx) => (
                            <Card key={inx} className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-blue-200 dark:border-blue-800">
                                <CardHeader>
                                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">{topic.summary.subject}</h2>
                                    <h3 className="text-lg text-blue-600 dark:text-blue-400">{topic.summary.topic}</h3>
                                </CardHeader>
                                
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {topic.summary.keyConcepts.map((item, i) => (
                                            <Badge key={i} variant="secondary" 
                                                className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="flex justify-end gap-3">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            let data = prev.filter((_, index) => inx !== index);
                                            localStorage.setItem("prev", JSON.stringify(data));
                                            setPrev(data);
                                        }}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <MdDeleteForever className="w-4 h-4" />
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => navigate(`/topic/${inx}`)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        Explore More
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-blue-200 dark:border-blue-800">
                        <CardContent className="flex justify-center items-center min-h-[300px]">
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">No Topics Found</p>
                        </CardContent>
                    </Card>
                )}
            </section>
        </main>
    );
}