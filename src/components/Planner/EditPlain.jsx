import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TopicPlain() {
    const { loggedIn } = useAuth();
    const { _id } = useParams();
    const navigate = useNavigate();
    const [formDisable, setDisable] = useState(false);
    const [keyConcept, setKeyConcept] = useState();
    const [material, setMaterial] = useState({});
    const [outline, setOutline] = useState({});
    const [formData, setFormData] = useState({
        summary: {
            date: "",
            subject: "",
            grade: "",
            topic: "",
            keyConcepts: ["", ""]
        },
        materials: [
            { name: "", required: "false" }
        ],
        objective: "",
        outline: [
            {
                duration: "",
                guide: "",
                remark: ""
            }
        ],
        note: ""
    });

    const handleChange = (e, section, index, field) => {
        const value = e.target.value;
        setFormData(prev => {
            const updated = { ...prev };
            if (index !== undefined) {
                updated[section][index][field] = value;
            } else if (field !== undefined) {
                updated[section][field] = value;
            } else {
                updated[section] = value;
            }
            return updated;
        });
    };

    useEffect(() => {
        if (!loggedIn) {
            navigate("/authente");
        }
        const prev = localStorage.getItem("prev") || "[]";
        let data = JSON.parse(prev);
        if (_id && data.length > _id) {
            setFormData(data[_id]);
        } else {
            toast.error("Topic Not Found!");
            navigate("/home");
        }
    }, [_id]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-pink-50 dark:from-slate-900 dark:to-purple-900 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <img
                    src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822500/samples/ecommerce/analog-classic.jpg"
                    alt="Header"
                    className="w-full h-48 object-cover rounded-lg mb-8 shadow-lg"
                />

                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
                    <CardHeader>
                        <CardTitle className="text-3xl font-serif text-purple-800 dark:text-purple-300">Lesson Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-violet-700 dark:text-violet-300">Date *</label>
                                <Input
                                    required
                                    disabled={formDisable}
                                    type="date"
                                    value={formData.summary?.date}
                                    onChange={(e) => handleChange(e, "summary", undefined, "date")}
                                    className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-violet-700 dark:text-violet-300">Subject *</label>
                                <Input
                                    required
                                    disabled={formDisable}
                                    value={formData.summary?.subject}
                                    onChange={(e) => handleChange(e, "summary", undefined, "subject")}
                                    className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-violet-700 dark:text-violet-300">Grade *</label>
                                <Input
                                    required
                                    disabled={formDisable}
                                    value={formData.summary?.grade}
                                    onChange={(e) => handleChange(e, "summary", undefined, "grade")}
                                    className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-violet-700 dark:text-violet-300">Topic *</label>
                                <Input
                                    required
                                    disabled={formDisable}
                                    value={formData.summary?.topic}
                                    onChange={(e) => handleChange(e, "summary", undefined, "topic")}
                                    className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium mb-4 text-violet-700 dark:text-violet-300">Key Concepts</label>
                            <div className="space-y-4">
                                {formData.summary?.keyConcepts.map((concept, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            disabled={formDisable}
                                            value={concept}
                                            onChange={(e) => {
                                                const updatedKeyConcepts = [...formData.summary.keyConcepts];
                                                updatedKeyConcepts[index] = e.target.value;
                                                setFormData(prev => ({
                                                    ...prev,
                                                    summary: {
                                                        ...prev.summary,
                                                        keyConcepts: updatedKeyConcepts
                                                    }
                                                }));
                                            }}
                                            className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                        />
                                        {!formDisable && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 dark:text-red-400"
                                                onClick={() => {
                                                    const data = formData.summary.keyConcepts.filter((item, inx) => inx != index);
                                                    setFormData(prev => ({ ...prev, summary: { ...prev.summary, keyConcepts: [...data] } }));
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {!formDisable && (
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={keyConcept || ''}
                                        onChange={(e) => setKeyConcept(e.target.value)}
                                        className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                        placeholder="Add new concept"
                                    />
                                    <Button
                                        onClick={() => {
                                            if (keyConcept) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    summary: {
                                                        ...prev.summary,
                                                        keyConcepts: [...prev.summary.keyConcepts, keyConcept]
                                                    }
                                                }));
                                                setKeyConcept(null);
                                            }
                                        }}
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                    >
                                        Add
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium mb-4 text-violet-700 dark:text-violet-300">Materials Required *</label>
                            <div className="space-y-4">
                                {formData.materials && formData.materials.map((material, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <Input
                                            required
                                            disabled={formDisable}
                                            value={material.name}
                                            onChange={(e) => handleChange(e, "materials", index, "name")}
                                            className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                        />
                                        <Select
                                            disabled={formDisable}
                                            value={material.required}
                                            onValueChange={(value) => handleChange({ target: { value } }, "materials", index, "required")}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Required</SelectItem>
                                                <SelectItem value="false">Optional</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {!formDisable && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 dark:text-red-400"
                                                onClick={() => {
                                                    const data = formData.materials.filter((item, inx) => inx != index);
                                                    setFormData(prev => ({ ...prev, materials: [...data] }));
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {!formDisable && (
                                    <div className="flex items-center gap-4">
                                        <Input
                                            placeholder="New material"
                                            value={material.name || ''}
                                            onChange={(e) => { setMaterial(prev => ({ ...prev, name: e.target.value })); }}
                                            className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                        />
                                        <Select
                                            value={material.required || 'false'}
                                            onValueChange={(value) => { setMaterial(prev => ({ ...prev, required: value })); }}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Required</SelectItem>
                                                <SelectItem value="false">Optional</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            onClick={() => {
                                                if (material.name && material.required) {
                                                    setFormData(prev => ({ ...prev, materials: [...prev.materials, material] }));
                                                    setMaterial({});
                                                }
                                            }}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-violet-700 dark:text-violet-300">Objective *</label>
                            <Input
                                required
                                disabled={formDisable}
                                value={formData.objective}
                                onChange={(e) => handleChange(e, "objective")}
                                className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium mb-4 text-violet-700 dark:text-violet-300">Lesson Outline *</label>
                            {formData.outline && formData.outline.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        required
                                        disabled={formDisable}
                                        value={item.duration}
                                        onChange={(e) => handleChange(e, "outline", index, "duration")}
                                        placeholder="Duration"
                                        className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                    />
                                    <Input
                                        required
                                        disabled={formDisable}
                                        value={item.guide}
                                        onChange={(e) => handleChange(e, "outline", index, "guide")}
                                        placeholder="Guide"
                                        className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Input
                                            required
                                            disabled={formDisable}
                                            value={item.remark}
                                            onChange={(e) => handleChange(e, "outline", index, "remark")}
                                            placeholder="Remarks"
                                            className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                        />
                                        {!formDisable && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 dark:text-red-400"
                                                onClick={() => {
                                                    const data = formData.outline.filter((item, inx) => inx != index);
                                                    setFormData(prev => ({ ...prev, outline: [...data] }));
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {!formDisable && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        value={outline.duration || ''}
                                        onChange={(e) => setOutline(prev => ({ ...prev, duration: e.target.value }))}
                                        placeholder="Duration"
                                        className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                    />
                                    <Input
                                        value={outline.guide || ''}
                                        onChange={(e) => setOutline(prev => ({ ...prev, guide: e.target.value }))}
                                        placeholder="Guide"
                                        className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={outline.remark || ''}
                                            onChange={(e) => setOutline(prev => ({ ...prev, remark: e.target.value }))}
                                            placeholder="Remarks"
                                            className="border-violet-200 focus:border-violet-500 dark:border-violet-700"
                                        />
                                        <Button
                                            onClick={() => {
                                                if (outline.duration && outline.guide && outline.remark) {
                                                    setFormData(prev => ({ ...prev, outline: [...prev.outline, outline] }));
                                                    setOutline({});
                                                }
                                            }}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-violet-700 dark:text-violet-300">Additional Notes</label>
                            <Textarea
                                disabled={formDisable}
                                value={formData.note}
                                onChange={(e) => handleChange(e, "note")}
                                placeholder="Add any additional notes here..."
                                className="min-h-[100px] border-violet-200 focus:border-violet-500 dark:border-violet-700"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            {formDisable ? (
                                <Button
                                    onClick={() => { setDisable(false); }}
                                    variant="outline"
                                    className="border-orange-200 hover:bg-orange-100 text-orange-600 dark:border-orange-800 dark:hover:bg-orange-900"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        let prev = JSON.parse(localStorage.getItem("prev")) || [];
                                        prev[_id] = formData;
                                        localStorage.setItem("prev", JSON.stringify(prev));
                                        navigate(`/topic/${_id}`);
                                        setDisable(true);
                                    }}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}