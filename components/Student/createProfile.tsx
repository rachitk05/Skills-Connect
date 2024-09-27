'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2, Camera, Sparkles, Loader2, X } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from "@/firebase.config"

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

export default function CreateProfile() {
    const { toast } = useToast()
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        skills: [],
        certifications: [],
        portfolio: '',
        experience: [{ title: '', company: '', duration: '', description: '' }],
        education: [{ degree: '', school: '', year: '' }],
        age: 0,
        bio: '',
        profilePhoto: '',
        tagline: '',
        projects: [{ name: '', url: '', description: '' }],
        interests: [],
        languages: [],
    })

    const [currentSection, setCurrentSection] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const sections = ['Basic Info', 'Education', 'Skills', 'Experience', 'Projects', 'Additional Info']

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
        const value = e.target.value
        if (value.endsWith(',')) {
            const newValue = value.slice(0, -1).trim()
            if (newValue && !(formData[field] as string[]).includes(newValue)) {
                setFormData(prev => ({
                    ...prev,
                    [field]: [...(prev[field] as string[]), newValue]
                }))
            }
            e.target.value = ''
        }
    }

    const removeArrayItem = (field: keyof FormData, index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index)
        }))
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

    const removeObjectArrayItem = (index: number, field: keyof FormData) => {
        const newArray = (formData[field] as any[]).filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, [field]: newArray }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (currentSection < sections.length - 1) {
            nextSection()
            return
        }
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
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to create profile')
            }

            const data = await response.json()
            toast({
                title: "Success",
                description: "Your profile has been created successfully!",
            })
            router.push('/')
        } catch (error) {
            console.error('Error creating profile:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const storageRef = ref(storage, `studentsProfilePhotos/${file.name}`)
                await uploadBytes(storageRef, file)
                const url = await getDownloadURL(storageRef)
                setFormData(prev => ({ ...prev, profilePhoto: url }))
                toast({
                    title: "Success",
                    description: "Profile photo uploaded successfully!",
                })
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

    const isCurrentSectionValid = () => {
        switch (currentSection) {
            case 0:
                return formData.name && formData.email && formData.age && formData.tagline && formData.bio
            case 1:
                return formData.education.every(edu => edu.degree && edu.school && edu.year)
            case 2:
                return formData.skills.length > 0
            case 3:
                return formData.experience.every(exp => exp.title && exp.company && exp.duration && exp.description)
            case 4:
                return formData.projects.every(proj => proj.name && proj.url && proj.description)
            case 5:
                return true // Additional info is optional
            default:
                return false
        }
    }

    const renderArrayInput = (field: keyof FormData, label: string, required: boolean = false) => (
        <div>
            <Label htmlFor={field} className="text-sm font-medium text-gray-500">
                {label} {required && '*'}
            </Label>
            <div className="mt-1 flex flex-wrap gap-2">
                {(formData[field] as string[]).map((item, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                        {item}
                        <button
                            type="button"
                            onClick={() => removeArrayItem(field, index)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
            <Input
                id={field}
                name={field}
                onChange={(e) => handleArrayInputChange(e, field)}
                className="mt-2"
                placeholder="Type and press comma to add"
                required={required && (formData[field] as string[]).length === 0}
            />
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                        <CardTitle className="text-3xl font-bold text-center">
                            <Sparkles className="inline-block mr-2" />
                            Create Your Amazing Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-between mb-8">
                                {sections.map((section, index) => (
                                    <Button
                                        key={section}
                                        variant={currentSection === index ? "default" : "outline"}
                                        onClick={() => setCurrentSection(index)}
                                        className="rounded-full text-sm"
                                    >
                                        {section}
                                    </Button>
                                ))}
                            </div>

                            <motion.div
                                key={currentSection}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentSection === 0 && (
                                    <div className="space-y-4">
                                        <div className="flex justify-center mb-6">
                                            <div className="relative w-32 h-32">
                                                <Image
                                                    src={formData.profilePhoto || 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'}
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Name *</Label>
                                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email *</Label>
                                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="age">Age *</Label>
                                                <Input id="age" name="age" type="number" value={formData.age || ''} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="tagline">Tagline *</Label>
                                                <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="bio">Bio *</Label>
                                            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} required className="mt-1" />
                                        </div>
                                    </div>
                                )}

                                {currentSection === 1 && (
                                    <div className="space-y-4">
                                        {formData.education.map((edu, index) => (
                                            <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                                                <Input
                                                    placeholder="Degree *"
                                                    value={edu.degree}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'education', 'degree')}
                                                    required
                                                />
                                                <Input
                                                    placeholder="School *"
                                                    value={edu.school}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'education', 'school')}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Year *"
                                                    value={edu.year}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'education', 'year')}
                                                    required
                                                />
                                                <Button type="button" variant="ghost" onClick={() => removeObjectArrayItem(index, 'education')}>
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('education')}>
                                            Add Education
                                        </Button>
                                    </div>
                                )}

                                {currentSection === 2 && (
                                    <div className="space-y-4">
                                        {renderArrayInput('skills', 'Skills', true)}
                                        {renderArrayInput('certifications', 'Certifications')}
                                    </div>
                                )}

                                {currentSection === 3 && (
                                    <div className="space-y-4">
                                        {formData.experience.map((exp, index) => (
                                            <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                                                <Input
                                                    placeholder="Title *"
                                                    value={exp.title}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'title')}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Company *"
                                                    value={exp.company}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'company')}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Duration *"
                                                    value={exp.duration}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'duration')}
                                                    required
                                                />
                                                <Textarea
                                                    placeholder="Description *"
                                                    value={exp.description}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'experience', 'description')}
                                                    required
                                                />
                                                <Button type="button" variant="ghost" onClick={() => removeObjectArrayItem(index, 'experience')}>
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('experience')}>
                                            Add Experience
                                        </Button>
                                    </div>
                                )}

                                {currentSection === 4 && (
                                    <div className="space-y-4">
                                        {formData.projects.map((project, index) => (
                                            <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                                                <Input
                                                    placeholder="Project Name *"
                                                    value={project.name}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'projects', 'name')}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Project URL *"
                                                    value={project.url}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'projects', 'url')}
                                                    required
                                                />
                                                <Textarea
                                                    placeholder="Project Description *"
                                                    value={project.description}
                                                    onChange={(e) => handleObjectArrayInputChange(e, index, 'projects', 'description')}
                                                    required
                                                />
                                                <Button type="button" variant="ghost" onClick={() => removeObjectArrayItem(index, 'projects')}>
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addArrayItem('projects')}>
                                            Add Project
                                        </Button>
                                    </div>
                                )}

                                {currentSection === 5 && (
                                    <div className="space-y-4">
                                        {renderArrayInput('interests', 'Interests')}
                                        {renderArrayInput('languages', 'Languages')}
                                        <div>
                                            <Label htmlFor="portfolio">Portfolio URL ( Inclding https:// )</Label>
                                            <Input id="portfolio" name="portfolio" type="url" value={formData.portfolio} onChange={handleInputChange} className="mt-1" />
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <div className="flex justify-between mt-8">
                                <Button type="button" onClick={prevSection} disabled={currentSection === 0}>
                                    Previous
                                </Button>
                                {currentSection === sections.length - 1 ? (
                                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white" disabled={isLoading || !isCurrentSectionValid()}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating Profile...
                                            </>
                                        ) : (
                                            'Complete Profile'
                                        )}
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={!isCurrentSectionValid()}>
                                        Next
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}