"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Upload, Briefcase, MapPin, DollarSign, Globe, Book, CheckCircle, Users, Gift, X } from 'lucide-react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase.config'
import { useToast } from "@/hooks/use-toast"

const formSteps = [
    { title: 'Basic Info', icon: Briefcase },
    { title: 'Job Details', icon: Book },
    { title: 'Team & Benefits', icon: Users },
]

interface Leader {
    name: string;
    title: string;
    image: string;
    description: string;
}

interface Benefit {
    icon: string;
    text: string;
}

interface FormData {
    title: string;
    company: string;
    logo: string;
    location: string;
    salary: string;
    remoteWork: string;
    skills: string[];
    description: string;
    minimumQualifications: string;
    responsibilities: string[];
    experienceRequired: string;
    leaders: Leader[];
    benefits: Benefit[];
}

export default function CreateJobPage() {
    const { toast } = useToast();
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        title: '',
        company: '',
        logo: '',
        location: '',
        salary: '',
        remoteWork: '',
        skills: [],
        description: '',
        minimumQualifications: '',
        responsibilities: [],
        experienceRequired: '',
        leaders: [{ name: '', title: '', image: '', description: '' }],
        benefits: [{ icon: '', text: '' }],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
        const value = e.target.value.trim()
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

    const handleObjectArrayChange = (
        index: number,
        field: 'leaders' | 'benefits',
        subField: keyof Leader | keyof Benefit,
        value: string
    ) => {
        setFormData(prev => {
            const newArray = [...prev[field]]
            if (field === 'leaders') {
                const newLeaders = [...prev.leaders]
                newLeaders[index] = { ...newLeaders[index], [subField]: value }
                return { ...prev, leaders: newLeaders }
            } else {
                const newBenefits = [...prev.benefits]
                newBenefits[index] = { ...newBenefits[index], [subField]: value }
                return { ...prev, benefits: newBenefits }
            }
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const storageRef = ref(storage, `jobsProfilePictures/${file.name}`)
                await uploadBytes(storageRef, file)
                const url = await getDownloadURL(storageRef)
                setFormData(prev => ({ ...prev, logo: url }))
                toast({
                    title: "Success",
                    description: "Logo uploaded successfully!",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Job created successfully!",
                })
                router.push('/')
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to create job')
            }
        } catch (error) {
            console.error('Error creating job:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create job. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, formSteps.length - 1))
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

    const isStepValid = () => {
        switch (currentStep) {
            case 0:
                return formData.title && formData.company && formData.location && formData.salary && formData.remoteWork
            case 1:
                return formData.skills.length > 0 && formData.description && formData.minimumQualifications && formData.responsibilities.length > 0 && formData.experienceRequired
            case 2:
                return formData.leaders.length > 0 && formData.benefits.length > 0
            default:
                return false
        }
    }

    const renderArrayInput = (field: keyof FormData, label: string, required: boolean = false) => (
        <div>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && '*'}
            </label>
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create an Amazing Job Opportunity</h1>
                    <div className="flex justify-center mb-12">
                        {formSteps.map((step, index) => (
                            <div key={step.title} className="flex items-center">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                                    index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                                } transition-all duration-300`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                {index < formSteps.length - 1 && (
                                    <div className={`w-24 h-1 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-200'} transition-all duration-300`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                                <Input id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full" />
                                            </div>
                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                                                <Input id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                                            <div className="flex items-center space-x-4">
                                                <Input id="logo" name="logo" type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                                                <Button type="button" onClick={() => document.getElementById('logo')?.click()} className="flex items-center">
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Upload Logo
                                                </Button>
                                                {formData.logo && <img src={formData.logo} alt="Company Logo" className="w-12 h-12 object-contain" />}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <Input id="location" name="location" value={formData.location} onChange={handleChange} required className="pl-10 w-full" />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                    <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} required className="pl-10 w-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="remoteWork" className="block text-sm font-medium text-gray-700 mb-1">Remote Work *</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, remoteWork: value }))} required>
                                                    <SelectTrigger className="pl-10 w-full">
                                                        <SelectValue placeholder="Select remote work option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="remote">Remote</SelectItem>
                                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                                        <SelectItem value="onsite">On-site</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        {renderArrayInput('skills', 'Skills', true)}
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="w-full h-32" />
                                        </div>
                                        <div>
                                            <label htmlFor="minimumQualifications" className="block text-sm font-medium text-gray-700 mb-1">Minimum Qualifications *</label>
                                            <Textarea id="minimumQualifications" name="minimumQualifications" value={formData.minimumQualifications} onChange={handleChange} required className="w-full h-32" />
                                        </div>
                                        {renderArrayInput('responsibilities', 'Responsibilities', true)}
                                        <div>
                                            <label htmlFor="experienceRequired" className="block text-sm font-medium text-gray-700 mb-1">Experience Required *</label>
                                            <Input id="experienceRequired" name="experienceRequired" value={formData.experienceRequired} onChange={handleChange} required className="w-full" />
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Team Leaders *</h3>
                                            {formData.leaders.map((leader, index) => (
                                                <div key={index} className="space-y-2 mb-4 p-4 bg-gray-50 rounded-lg">
                                                    <Input
                                                        placeholder="Name"
                                                        value={leader.name}
                                                        onChange={(e) => handleObjectArrayChange(index, 'leaders', 'name', e.target.value)}
                                                        className="w-full"
                                                        required
                                                    />
                                                    <Input
                                                        placeholder="Title"
                                                        value={leader.title}
                                                        onChange={(e) => handleObjectArrayChange(index, 'leaders', 'title', e.target.value)}
                                                        className="w-full"
                                                        required
                                                    />
                                                    <Input
                                                        placeholder="Image URL"
                                                        value={leader.image}
                                                        onChange={(e) => handleObjectArrayChange(index, 'leaders', 'image', e.target.value)}
                                                        className="w-full"
                                                    />
                                                    <Textarea
                                                        placeholder="Description"
                                                        value={leader.description}
                                                        onChange={(e) => handleObjectArrayChange(index, 'leaders', 'description', e.target.value)}
                                                        className="w-full"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            <Button type="button" onClick={() => setFormData(prev => ({ ...prev, leaders: [...prev.leaders, { name: '', title: '', image: '', description: '' }] }))} className="mt-2">
                                                Add Leader
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Benefits *</h3>
                                            {formData.benefits.map((benefit, index) => (
                                                <div key={index} className="space-y-2 mb-4 p-4 bg-gray-50 rounded-lg">
                                                    <Input
                                                        placeholder="Icon (e.g., health-insurance)"
                                                        value={benefit.icon}
                                                        onChange={(e) => handleObjectArrayChange(index, 'benefits', 'icon', e.target.value)}
                                                        className="w-full"
                                                        required
                                                    />
                                                    <Input
                                                        placeholder="Benefit description"
                                                        value={benefit.text}
                                                        onChange={(e) => handleObjectArrayChange(index, 'benefits', 'text', e.target.value)}
                                                        className="w-full"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            <Button type="button" onClick={() => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, { icon: '', text: '' }] }))} className="mt-2">
                                                Add Benefit
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                        <div className="mt-8 flex justify-between">
                            {currentStep > 0 && (
                                <Button type="button"
                                        onClick={prevStep}
                                        variant="outline">
                                    Previous
                                </Button>
                            )}
                            {currentStep < formSteps.length - 1 ? (
                                <Button type="button"
                                        onClick={nextStep}
                                        className="ml-auto"
                                        disabled={!isStepValid()}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit"
                                        disabled={isSubmitting || !isStepValid()}
                                        className="ml-auto">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Job...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Create Job
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}