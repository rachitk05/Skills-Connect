'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Globe, Building2, Mail, Hash } from 'lucide-react'

const initialCompanyData = {
    name: "",
    email: "",
    bio: "",
    logo: "",
    location: "",
    website: "",
    category: ""
}

export default function CreativeCompanyProfile() {
    const [companyData, setCompanyData] = useState(initialCompanyData)
    const [isEditing, setIsEditing] = useState(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCompanyData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        console.log(companyData)
        setIsEditing(false)
    }

    const renderEditForm = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="relative">
                <Input
                    id="name"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                    className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 px-0"
                    placeholder="Enter Company Name"
                />
                <Building2 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-500">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={companyData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                    />
                    <Mail className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
                <div className="relative">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-500">Category</Label>
                    <Input
                        id="category"
                        name="category"
                        value={companyData.category}
                        onChange={handleInputChange}
                        className="mt-1"
                    />
                    <Hash className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
            </div>
            <div>
                <Label htmlFor="bio" className="text-sm font-medium text-gray-500">Company Bio</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    value={companyData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1"
                    placeholder="Tell us about your company..."
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <Label htmlFor="location" className="text-sm font-medium text-gray-500">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={companyData.location}
                        onChange={handleInputChange}
                        className="mt-1"
                    />
                    <MapPin className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
                <div className="relative">
                    <Label htmlFor="website" className="text-sm font-medium text-gray-500">Website</Label>
                    <Input
                        id="website"
                        name="website"
                        value={companyData.website}
                        onChange={handleInputChange}
                        className="mt-1"
                    />
                    <Globe className="absolute right-2 top-8 text-gray-400" size={18} />
                </div>
            </div>
            <div>
                <Label htmlFor="logo" className="text-sm font-medium text-gray-500">Logo URL</Label>
                <Input
                    id="logo"
                    name="logo"
                    value={companyData.logo}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="https://example.com/logo.png"
                />
            </div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105">
                Create Profile
            </Button>
        </motion.div>
    )

    const renderProfile = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex items-center space-x-6">
                <Image
                    src={companyData.logo || "/placeholder.svg"}
                    alt={companyData.name}
                    width={100}
                    height={100}
                    className="rounded-full shadow-lg"
                />
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        {companyData.name}
                    </h1>
                    <p className="text-gray-500 mt-2">{companyData.category}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="text-blue-500" size={18} />
                    <span>{companyData.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                    <Globe className="text-purple-500" size={18} />
                    <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {companyData.website}
                    </a>
                </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-inner">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">About Us</h2>
                <p className="text-gray-700 leading-relaxed">{companyData.bio}</p>
            </div>
            <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
            >
                Edit Profile
            </Button>
        </motion.div>
    )

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-8">
                        {isEditing ? renderEditForm() : renderProfile()}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}