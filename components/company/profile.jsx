'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Globe, Mail, Award, Users, Briefcase, Target, Star, Edit3 } from 'lucide-react'

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

export default function CreativeCompanyProfile({ companyId }: { companyId: string }) {
    const [companyData, setCompanyData] = useState<Company | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`/api/companies/${companyId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch company data')
                }
                const data = await response.json()
                setCompanyData(data.data)
                setIsLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                setIsLoading(false)
            }
        }

        fetchCompanyData()
    }, [companyId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCompanyData(prev => prev ? { ...prev, [name]: value } : null)
    }

    const handleArrayChange = (name: keyof Company, index: number, value: string) => {
        setCompanyData(prev => {
            if (!prev) return null
            const updatedArray = [...prev[name] as string[]]
            updatedArray[index] = value
            return { ...prev, [name]: updatedArray }
        })
    }

    const handleSave = async () => {
        if (!companyData) return
        try {
            const response = await fetch(`/api/companies/${companyId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(companyData)
            })
            if (!response.ok) {
                throw new Error('Failed to save company data')
            }
            const updatedData = await response.json()
            setCompanyData(updatedData.data)
            setIsEditing(false)
        } catch (err) {
            console.error(err)
        }
    }

    const renderEditDialog = () => (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Company Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="text-gray-300">Company Name</Label>
                            <Input id="name" name="name" value={companyData?.name} onChange={handleInputChange} className="bg-gray-700 text-white border-gray-600" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input id="email" name="email" value={companyData?.email} onChange={handleInputChange} className="bg-gray-700 text-white border-gray-600" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="bio" className="text-gray-300">Company Bio</Label>
                        <Textarea id="bio" name="bio" value={companyData?.bio} onChange={handleInputChange} className="bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="profilePicture" className="text-gray-300">Profile Picture URL</Label>
                            <Input id="profilePicture" name="profilePicture" value={companyData?.profilePicture} onChange={handleInputChange} className="bg-gray-700 text-white border-gray-600" />
                        </div>
                        <div>
                            <Label htmlFor="location" className="text-gray-300">Location</Label>
                            <Input id="location" name="location" value={companyData?.location} onChange={handleInputChange} className="bg-gray-700 text-white border-gray-600" />
                        </div>
                    </div>
                    {/* Add more fields here... */}
                </div>
                <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">Save changes</Button>
            </DialogContent>
        </Dialog>
    )

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>
    }

    if (!companyData) {
        return <div className="text-center py-10">No company data available</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-gray-800 text-white">
                    <CardContent className="p-0">
                        <div className="relative h-60 bg-gradient-to-r from-blue-600 to-purple-600">
                            {companyData.profilePicture && (
                                <Image
                                    src={companyData.profilePicture}
                                    alt={companyData.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="opacity-30"
                                />
                            )}
                            <div className="absolute bottom-4 left-4 flex items-end">
                                {companyData.profilePicture && (
                                    <Image
                                        src={companyData.profilePicture}
                                        alt={companyData.name}
                                        width={100}
                                        height={100}
                                        className="rounded-full border-4 border-white shadow-lg"
                                    />
                                )}
                                <div className="ml-4 text-white">
                                    <h1 className="text-4xl font-bold">{companyData.name}</h1>
                                    <p className="text-lg opacity-90">{companyData.category}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex flex-wrap gap-2">
                                    {companyData.location && (
                                        <Badge variant="secondary" className="flex items-center bg-blue-500 text-white">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {companyData.location}
                                        </Badge>
                                    )}
                                    {companyData.employeeCount && (
                                        <Badge variant="secondary" className="flex items-center bg-purple-500 text-white">
                                            <Users className="w-4 h-4 mr-1" />
                                            {companyData.employeeCount} employees
                                        </Badge>
                                    )}
                                    {companyData.foundedYear && (
                                        <Badge variant="secondary" className="flex items-center bg-green-500 text-white">
                                            <Briefcase className="w-4 h-4 mr-1" />
                                            Founded {companyData.foundedYear}
                                        </Badge>
                                    )}
                                </div>
                                <Button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600">
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </div>

                            <AnimatePresence>
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">About Us</h2>
                                    <p className="text-gray-300">{companyData.bio}</p>
                                </motion.section>

                                <Separator className="my-8 bg-gray-700" />

                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">Specialties</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {companyData.specialties.map((specialty, index) => (
                                            <Badge key={index} variant="outline" className="text-blue-300 border-blue-300">
                                                {specialty}
                                            </Badge>
                                        ))}
                                    </div>
                                </motion.section>

                                <Separator className="my-8 bg-gray-700" />

                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">Notable Clients</h2>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {companyData.clients.map((client, index) => (
                                            <li key={index} className="flex items-center text-gray-300">
                                                <Target className="w-5 h-5 mr-2 text-blue-400" />
                                                {client}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>

                                <Separator className="my-8 bg-gray-700" />

                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">Achievements</h2>
                                    <ul className="space-y-4">
                                        {companyData.achievements.map((achievement, index) => (
                                            <li key={index} className="flex items-start text-gray-300">
                                                <Award className="w-6 h-6 mr-2 text-yellow-400 flex-shrink-0 mt-1" />
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>

                                <Separator className="my-8 bg-gray-700" />

                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">Contact Information</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {companyData.email && (
                                            <div className="flex items-center text-gray-300">
                                                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                                                <a href={`mailto:${companyData.email}`} className="hover:underline">{companyData.email}</a>
                                            </div>
                                        )}
                                        {companyData.website && (
                                            <div className="flex items-center text-gray-300">
                                                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                                                <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{companyData.website}</a>
                                            </div>
                                        )}
                                    </div>
                                </motion.section>

                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="mt-8 bg-gray-700 rounded-xl p-6 flex justify-between items-center"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Briefcase className="w-8 h-8 text-blue-400" />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-200">Projects Posted</p>
                                            <p className="text-3xl font-bold text-blue-300">{companyData.projectsPosted}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Star className="w-8 h-8 text-yellow-400" />
                                        <div>
                                            <p className="text-lg font-semibold text-gray-200">Rating</p>
                                            <p className="text-3xl font-bold text-yellow-300">{companyData.ratings.toFixed(1)}</p>
                                        </div>
                                    </div>
                                </motion.section>
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            {isEditing && renderEditDialog()}
        </div>
    )
}