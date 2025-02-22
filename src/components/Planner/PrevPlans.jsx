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
        <main className="min-h-screen bg-background">
            <div className="fixed inset-0 bg-cover bg-center -z-10 opacity-25 dark:opacity-10"
                style={{ backgroundImage: `url('https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg')` }}>
            </div>
            
            <section className="container mx-auto px-4 py-8 md:py-12 relative z-10">
                {prev && prev.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5">
                        {prev.map((topic, inx) => (
                            <Card key={inx} className="backdrop-blur-sm border bg-card">
                                <CardHeader>
                                    <h2 className="text-xl font-bold">{topic.summary.subject}</h2>
                                    <h3 className="text-lg text-muted-foreground">{topic.summary.topic}</h3>
                                </CardHeader>
                                
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {topic.summary.keyConcepts.map((item, i) => (
                                            <Badge key={i} variant="secondary" className="rounded-full">
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
                                        className="flex items-center gap-2"
                                    >
                                        <MdDeleteForever className="w-4 h-4" />
                                        Delete
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => navigate(`/topic/${inx}`)}
                                    >
                                        Explore More
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="backdrop-blur-sm border bg-card/50">
                        <CardContent className="flex justify-center items-center min-h-[300px]">
                            <p className="text-2xl font-bold text-muted-foreground">No Topics Found</p>
                        </CardContent>
                    </Card>
                )}
            </section>
        </main>
    );
}