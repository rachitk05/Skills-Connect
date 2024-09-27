'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Globe, Mail, Award, Users, Briefcase, Target } from 'lucide-react'

export default function CompanyProfileDisplay({ companyId }) {
    const [companyData, setCompanyData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch company data when component mounts or companyId changes
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                console.log(companyId);
                const response = await fetch(`/api/companies/${companyId}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch company data')
                }
                const data = await response.json()
                setCompanyData(data.data)
                setIsLoading(false)
            } catch (err) {
                setError(err.message)
                setIsLoading(false)
            }
        }

        fetchCompanyData()
    }, [companyId])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCompanyData(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayChange = (name, index, value) => {
        setCompanyData(prev => ({
            ...prev,
            [name]: prev[name].map((item, i) => i === index ? value : item)
        }))
    }

    const handleSave = async () => {
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
    console.log(companyData)
    const renderEditDialog = () => (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Company Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Company Name</Label>
                            <Input id="name" name="name" value={companyData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" value={companyData.email} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="bio">Company Bio</Label>
                        <Textarea id="bio" name="bio" value={companyData.bio} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input id="logo" name="logo" value={companyData.profilePicture} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" value={companyData.location} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" name="website" value={companyData.website} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={companyData.category} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="foundedYear">Founded Year</Label>
                            <Input id="foundedYear" name="foundedYear" type="number" value={companyData.foundedYear} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="employeeCount">Employee Count</Label>
                            <Input id="employeeCount" name="employeeCount" value={companyData.employeeCount} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <Label>Specialties</Label>
                        {companyData.specialties.map((specialty, index) => (
                            <Input
                                key={index}
                                value={specialty}
                                onChange={(e) => handleArrayChange('specialties', index, e.target.value)}
                                className="mt-2"
                            />
                        ))}
                    </div>
                    <div>
                        <Label>Clients</Label>
                        {companyData.clients.map((client, index) => (
                            <Input
                                key={index}
                                value={client}
                                onChange={(e) => handleArrayChange('clients', index, e.target.value)}
                                className="mt-2"
                            />
                        ))}
                    </div>
                    <div>
                        <Label>Achievements</Label>
                        {companyData.achievements.map((achievement, index) => (
                            <Input
                                key={index}
                                value={achievement}
                                onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                                className="mt-2"
                            />
                        ))}
                    </div>
                </div>
                <Button onClick={handleSave}>Save changes</Button>
            </DialogContent>
        </Dialog>
    )

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>
    }

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="border-none shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
                            {companyData.profilePicture && (
                                <Image
                                    src={companyData.profilePicture || "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"}
                                    alt={companyData.name}
                                    objectFit="cover"
                                    width={100}
                                    height={100}
                                    className="opacity-20 max-h-40 max-w-40"
                                />
                            )}
                            <div className="absolute bottom-4 left-4 flex items-end">
                                {companyData.profilePicture && (
                                    <Image
                                        src={companyData.profilePicture || "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"}
                                        alt={companyData.name}
                                        width={150}
                                        height={150}
                                        className="rounded-full border-4 border-white shadow-lg max-h-40 max-w-40"
                                    />
                                )}
                                <div className="ml-4 text-white">
                                    <h1 className="text-3xl font-bold">{companyData.name}</h1>
                                    <p className="text-sm opacity-90">{companyData.category}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex space-x-4">
                                    {companyData.location && (
                                        <Badge variant="secondary" className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {companyData.location}
                                        </Badge>
                                    )}
                                    {companyData.employeeCount && (
                                        <Badge variant="secondary" className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {companyData.employeeCount} employees
                                        </Badge>
                                    )}
                                    {companyData.foundedYear && (
                                        <Badge variant="secondary" className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-1" />
                                            Founded {companyData.foundedYear}
                                        </Badge>
                                    )}
                                </div>
                                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            </div>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                                <p className="text-gray-700">{companyData.bio}</p>
                            </section>

                            <Separator className="my-8" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Specialties</h2>
                                <div className="flex flex-wrap gap-2">
                                    {companyData.specialties && companyData.specialties.map((specialty, index) => (
                                        <Badge key={index} variant="outline" className="text-blue-600 border-blue-600">
                                            {specialty}
                                        </Badge>
                                    ))}
                                </div>
                            </section>

                            <Separator className="my-8" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Notable Clients</h2>
                                <ul className="grid grid-cols-2 gap-4">
                                    {companyData.clients && companyData.clients.map((client, index) => (
                                        <li key={index} className="flex items-center">
                                            <Target className="w-5 h-5 mr-2 text-blue-500" />
                                            {client}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <Separator className="my-8" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
                                <ul className="space-y-4">
                                    {companyData.achievements && companyData.achievements.map((achievement, index) => (
                                        <li key={index} className="flex items-start">
                                            <Award className="w-6 h-6 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <Separator className="my-8" />

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {companyData.email && (
                                        <div className="flex items-center">
                                            <Mail className="w-5 h-5 mr-2 text-blue-500" />
                                            <a href={`mailto:${companyData.email}`} className="hover:underline">{companyData.email}</a>
                                        </div>
                                    )}
                                    {companyData.website && (
                                        <div className="flex items-center">
                                            <Globe className="w-5 h-5 mr-2 text-blue-500" />
                                            <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{companyData.website}</a>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            {isEditing && renderEditDialog()}
        </div>
    )
}
