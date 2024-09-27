'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2, Camera, Sparkles } from 'lucide-react'
import {useToast} from "@/hooks/use-toast";

interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
}

interface Education {
    degree: string;
    school: string;
    year: string;
}

interface Project {
    name: string;
    url: string;
    description: string;
}

interface FormData {
    name: string;
    email: string;
    skills: string[];
    certifications: string[];
    portfolio: string;
    experience: Experience[];
    education: Education[];
    age: number;
    bio: string;
    profilePhoto: string;
    tagline: string;
    projects: Project[];
    interests: string[];
    languages: string[];
}

export default function CreateProfile({ initialData = {} }) {
    const toast = useToast();
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        name: initialData.name || '',
        email: initialData.email || '',
        skills: initialData.skills || [],
        certifications: initialData.certifications || [],
        portfolio: initialData.portfolio || '',
        experience: initialData.experience || [{
            title: '',
            company: '',
            duration: '',
            description: ''
        }],
        education: initialData.education || [{
            degree: '',
            school: '',
            year: ''
        }],
        age: initialData.age || 0,
        bio: initialData.bio || '',
        profilePhoto: initialData.profilePhoto || '',
        tagline: initialData.tagline || '',
        projects: initialData.projects || [{
            name: '',
            url: '',
            description: ''
        }],
        interests: initialData.interests || [],
        languages: initialData.languages || [],
    })

    const [currentSection, setCurrentSection] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const sections = ['Basic Info', 'Education', 'Skills', 'Experience', 'Projects', 'Additional Info']

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof FormData) => {
        const newArray = [...formData[field] as string[]]
        newArray[index] = e.target.value
        setFormData(prev => ({ ...prev, [field]: newArray }))
    }

    const handleObjectArrayInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof FormData, subField: string) => {
        const newArray = [...formData[field] as any[]]
        newArray[index] = { ...newArray[index], [subField]: e.target.value }
        setFormData(prev => ({ ...prev, [field]: newArray }))
    }

    const addArrayItem = (field: keyof FormData) => {
        const newItem = field === 'experience' ? { title: '', company: '', duration: '', description: '' } :
            field === 'education' ? { degree: '', school: '', year: '' } :
                field === 'projects' ? { name: '', url: '', description: '' } : ''
        setFormData(prev => ({ ...prev, [field]: [...prev[field] as any[], newItem] }))
    }

    const removeArrayItem = (index: number, field: keyof FormData) => {
        const newArray = (formData[field] as any[]).filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, [field]: newArray }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch('/api/students/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to create profile')
            }

            const data = await response.json()
            toast({
                title: "Success",
                description: "Your profile has been created successfully!",
            })
            // router.push('/profile')
        } catch (error) {
            console.error('Error creating profile:', error)
            toast({
                title: "Error",
                description: "Failed to create profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error('Failed to upload image')
                }

                const data = await response.json()
                setFormData(prev => ({ ...prev, profilePhoto: data.url }))
            } catch (error) {
                console.error('Error uploading image:', error)
                toast({
                    title: "Error",
                    description: "Failed to upload image. Please try again.",
                    variant: "destructive",
                })
            }
        }
    }

    const nextSection = () => {
        if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1)
        }
    }

    const prevSection = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Abstract Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-4xl"
            >
                <Card className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                        <CardTitle className="text-3xl font-bold text-center">
                            <Sparkles className="inline-block mr-2" />
                            Complete Your Awesome Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-between mb-4">
                                {sections.map((section, index) => (
                                    <Button
                                        key={section}
                                        variant={currentSection === index ? "default" : "outline"}
                                        onClick={() => setCurrentSection(index)}
                                        className="rounded-full"
                                    >
                                        {section}
                                    </Button>
                                ))}
                            </div>

                            {currentSection === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <div className="flex justify-center mb-6">
                                        <div className="relative w-32 h-32">
                                            <Image
                                                src={formData.profilePhoto || "/placeholder.svg?height=128&width=128"}
                                                alt="Profile"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                            <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
                                                <Camera className="text-white" />
                                                <input id="profilePhoto" name="profilePhoto" type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="age">Age</Label>
                                            <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="tagline">Tagline</Label>
                                            <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} required className="mt-1" />
                                    </div>
                                </motion.div>
                            )}

                            {currentSection === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    {formData.education.map((edu, index) => (
                                        <div key={index} className="space-y-2">
                                            <Input
                                                placeholder="Degree"
                                                value={edu.degree}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'education', 'degree')}
                                                required
                                            />
                                            <Input
                                                placeholder="School"
                                                value={edu.school}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'education', 'school')}
                                                required
                                            />
                                            <Input
                                                placeholder="Year"
                                                value={edu.year}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'education', 'year')}
                                                required
                                            />
                                            <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, 'education')}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => addArrayItem('education')}>
                                        Add Education
                                    </Button>
                                </motion.div>
                            )}

                            {currentSection === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label>Skills</Label>
                                        {formData.skills.map((skill, index) => (
                                            <div key={index} className="flex items-center space-x-2 mt-2">
                                                <Input
                                                    value={skill}
                                                    onChange={(e) => handleArrayInputChange(e, index, 'skills')}
                                                    placeholder="Enter a skill"
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, 'skills')}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('skills')} className="mt-2">
                                            <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                                        </Button>
                                    </div>
                                    <div>
                                        <Label>Certifications</Label>
                                        {formData.certifications.map((cert, index) => (
                                            <div key={index} className="flex items-center space-x-2 mt-2">
                                                <Input
                                                    value={cert}
                                                    onChange={(e) => handleArrayInputChange(e, index, 'certifications')}
                                                    placeholder="Enter a certification"
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, 'certifications')}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('certifications')} className="mt-2">
                                            <PlusCircle className="h-4 w-4 mr-2" /> Add Certification
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentSection === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    {formData.experience.map((exp, index) => (
                                        <div key={index} className="space-y-2">
                                            <Input
                                                placeholder="Title"
                                                value={exp.title}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'title')}
                                                required
                                            />
                                            <Input
                                                placeholder="Company"
                                                value={exp.company}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'company')}
                                                required
                                            />
                                            <Input
                                                placeholder="Duration"
                                                value={exp.duration}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'duration')}
                                                required
                                            />
                                            <Textarea
                                                placeholder="Description"
                                                value={exp.description}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'description')}
                                                required
                                            />
                                            <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, 'experience')}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => addArrayItem('experience')}>
                                        Add Experience
                                    </Button>
                                </motion.div>
                            )}

                            {currentSection === 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    {formData.projects.map((project, index) => (
                                        <div key={index} className="space-y-2">
                                            <Input
                                                placeholder="Project Name"
                                                value={project.name}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'projects', 'name')}
                                                required
                                            />
                                            <Input
                                                placeholder="Project URL"
                                                value={project.url}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'projects', 'url')}
                                                required
                                            />
                                            <Textarea
                                                placeholder="Project Description"
                                                value={project.description}
                                                onChange={(e) => handleObjectArrayInputChange(e, index, 'projects', 'description')}
                                                required
                                            />
                                            <Button type="button" variant="ghost" onClick={() => removeArrayItem(index, 'projects')}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => addArrayItem('projects')}>
                                        Add Project
                                    </Button>
                                </motion.div>
                            )}

                            {currentSection === 5 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label>Interests</Label>
                                        {formData.interests.map((interest, index) => (
                                            <div key={index} className="flex items-center space-x-2 mt-2">
                                                <Input
                                                    value={interest}
                                                    onChange={(e) => handleArrayInputChange(e, index, 'interests')}
                                                    placeholder="Enter an interest"
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, 'interests')}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('interests')} className="mt-2">
                                            <PlusCircle className="h-4 w-4 mr-2" /> Add Interest
                                        </Button>
                                    </div>
                                    <div>
                                        <Label>Languages</Label>
                                        {formData.languages.map((language, index) => (
                                            <div key={index} className="flex items-center space-x-2 mt-2">
                                                <Input
                                                    value={language}
                                                    onChange={(e) => handleArrayInputChange(e, index, 'languages')}
                                                    placeholder="Enter a language"
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(index, 'languages')}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('languages')} className="mt-2">
                                            <PlusCircle className="h-4 w-4 mr-2" /> Add Language
                                        </Button>
                                    </div>
                                    <div>
                                        <Label htmlFor="portfolio">Portfolio URL</Label>
                                        <Input id="portfolio" name="portfolio" type="url" value={formData.portfolio} onChange={handleInputChange} className="mt-1" />
                                    </div>
                                </motion.div>
                            )}

                            <div className="flex justify-between mt-6">
                                <Button type="button" onClick={prevSection} disabled={currentSection === 0}>
                                    Previous
                                </Button>
                                {currentSection === sections.length - 1 ? (
                                    <Button type="submit" className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white" disabled={isLoading}>
                                        {isLoading ? 'Creating Profile...' : 'Complete Profile'}
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={nextSection}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
            <div className="fixed bottom-0 left-0 w-64 h-64 -z-10">
                <Image src="/placeholder.svg?height=256&width=256" alt="Decoration" width={256} height={256} className="opacity-50" />
            </div>
            <div className="fixed top-0 right-0 w-64 h-64 -z-10">
                <Image src="/placeholder.svg?height=256&width=256" alt="Decoration" width={256} height={256} className="opacity-50" />
            </div>
        </div>
    )
}