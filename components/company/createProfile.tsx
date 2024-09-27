'use client'

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Globe, Building2, Mail, Hash, Calendar, Users, Award, Briefcase, Star, Camera, X } from 'lucide-react'
import { storage } from '@/firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

interface Company {
    name: string;
    email: string;
    bio: string;
    profilePicture: string;
    location: string;
    website: string;
    projectsPosted: number;
    ratings: number;
    category: string;
    foundedYear: number;
    employeeCount: string;
    specialties: string[];
    clients: string[];
    achievements: string[];
}

const initialCompanyData: Company = {
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
    location: "",
    website: "",
    projectsPosted: 0,
    ratings: 0,
    category: "",
    foundedYear: new Date().getFullYear(),
    employeeCount: "",
    specialties: [],
    clients: [],
    achievements: []
}

export default function CreativeCompanyProfile() {
    const { toast } = useToast()
    const router = useRouter()
    const [companyData, setCompanyData] = useState<Company>(initialCompanyData)
    const [isEditing, setIsEditing] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCompanyData(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Company) => {
        const value = e.target.value
        if (value.endsWith(',')) {
            const newValue = value.slice(0, -1)
            if (newValue && !(companyData[field] as string[]).includes(newValue)) {
                setCompanyData(prev => ({
                    ...prev,
                    [field]: [...(prev[field] as string[]), newValue]
                }))
            }
            e.target.value = ''
        }
    }

    const removeArrayItem = (field: keyof Company, index: number) => {
        setCompanyData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index)
        }))
    }

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                const storageRef = ref(storage, `companiesProfilePictures/${file.name}`)
                await uploadBytes(storageRef, file)

                const url = await getDownloadURL(storageRef)
                setCompanyData(prev => ({ ...prev, profilePicture: url }))
                toast({
                    title: "Success",
                    description: "Profile picture uploaded successfully.",
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

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/companies/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyData),
            })

            if (response.ok) {
                await response.json()
                toast({
                    title: "Success",
                    description: "Company profile created successfully!",
                })
                setIsEditing(false)
                // Redirect to home page after successful profile creation
                router.push('/')
            } else {
                throw new Error('Failed to create company profile')
            }
        } catch (error) {
            console.error('Error creating company profile:', error)
            toast({
                title: "Error",
                description: "Failed to create company profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const renderArrayInput = (field: keyof Company, label: string, required: boolean = false) => (
        <div>
            <Label htmlFor={field} className="text-sm font-medium text-gray-500">
                {label} {required && '*'}
            </Label>
            <div className="mt-1 flex flex-wrap gap-2">
                {(companyData[field] as string[]).map((item, index) => (
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
                placeholder="Type and press , to add new one"
                required={required && (companyData[field] as string[]).length === 0}
            />
        </div>
    )

    const renderEditForm = () => (
        <motion.form
            onSubmit={handleSave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                    <Image
                        src={companyData.profilePicture || "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="rounded-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                    >
                        <Camera className="text-white" size={20} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>
            <div className="relative">
                <Label htmlFor="email" className="text-sm font-medium text-gray-500">Company Name *</Label>
                <Input
                    id="name"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                    className=""
                    placeholder="Enter Company Name"
                    required
                />
                <Building2 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-500">Email *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={companyData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                    />
                    <Mail className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
                <div className="relative">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-500">Category *</Label>
                    <Input
                        id="category"
                        name="category"
                        value={companyData.category}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                    />
                    <Hash className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
            </div>
            <div>
                <Label htmlFor="bio" className="text-sm font-medium text-gray-500">Company Bio *</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    value={companyData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1"
                    placeholder="Tell us about your company..."
                    required
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-500">Location *</Label>
                    <Input
                        id="location"
                        name="location"
                        value={companyData.location}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                    />
                    <MapPin className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
                <div className="relative">
                    <Label htmlFor="website" className="text-sm font-medium text-gray-500">Website *</Label>
                    <Input
                        id="website"
                        name="website"
                        value={companyData.website}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                    />
                    <Globe className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                    <Label htmlFor="foundedYear" className="text-sm font-medium text-gray-500">Founded Year *</Label>
                    <Input
                        id="foundedYear"
                        name="foundedYear"
                        type="number"
                        value={companyData.foundedYear}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                        min={1800}
                        max={new Date().getFullYear()}
                    />
                    <Calendar className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
                <div className="relative">
                    <Label htmlFor="employeeCount" className="text-sm font-medium text-gray-500">Employee Count *</Label>
                    <Input
                        id="employeeCount"
                        name="employeeCount"
                        value={companyData.employeeCount}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                    />
                    <Users className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
                <div className="relative">
                    <Label htmlFor="ratings" className="text-sm font-medium text-gray-500">Ratings</Label>
                    <Input
                        id="ratings"
                        name="ratings"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={companyData.ratings}
                        onChange={handleInputChange}
                        className="mt-1"
                    />
                    <Star className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
            </div>
            {renderArrayInput('specialties', 'Specialties', true)}
            {renderArrayInput('clients', 'Clients')}
            {renderArrayInput('achievements', 'Achievements')}
            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
                disabled={isLoading}
            >
                {isLoading ? 'Creating Profile...' : 'Create Profile'}
            </Button>
        </motion.form>
    )

    const renderProfile = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Profile content remains unchanged */}
        </motion.div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm bg-white/30">
                    <CardContent className="p-8">
                        <AnimatePresence mode="wait">
                            {isEditing ? renderEditForm() : renderProfile()}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}