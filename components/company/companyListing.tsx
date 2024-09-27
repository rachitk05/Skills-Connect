'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Globe, Users, Search } from 'lucide-react'
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";

interface Company {
    _id: string
    name: string
    email: string
    bio: string
    profilePicture: string
    location: string
    website: string
    projectsPosted: number
    ratings: string
    category: string
    foundedYear: number
    employeeCount: string
    specialties: string[]
}

export default function CompaniesListing() {
    const router = useRouter();
    const [companies, setCompanies] = useState<Company[]>([])
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('/api/companies')
                const data = await response.json()
                setCompanies(data)
                setFilteredCompanies(data)
            } catch (error) {
                console.error("Error fetching companies:", error)
            }
        }
        fetchCompanies()
    }, [])

    useEffect(() => {
        const filtered = companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCompanies(filtered)
    }, [searchTerm, companies])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Discover Innovative Companies</h1>
                <div className="relative w-full max-w-md mx-auto mb-12">
                    <Input
                        type="text"
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCompanies.map((company) => (
                        <Card key={company._id}
                              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-14 w-14">
                                    <AvatarImage src={company.profilePicture} alt={company.name}/>
                                    <AvatarFallback>{company.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-xl">{company.name}</CardTitle>
                                    <Badge variant="secondary" className="mt-1">{company.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4 line-clamp-2">{company.bio}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <MapPin className="w-4 h-4 mr-2"/>
                                    {company.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <Globe className="w-4 h-4 mr-2"/>
                                    <a href={company.website} target="_blank" rel="noopener noreferrer"
                                       className="hover:underline">
                                        {company.website}
                                    </a>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <Users className="w-4 h-4 mr-2"/>
                                    {company.employeeCount} employees
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {company.specialties.slice(0, 3).map((specialty, index) => (
                                        <Badge key={index} variant="outline">{specialty}</Badge>
                                    ))}
                                    {company.specialties.length > 3 && (
                                        <Badge variant="outline">+{company.specialties.length - 3} more</Badge>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <Button
                                        variant="bordered"
                                        className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                                        onClick={() => router.push(`/company/${company._id}`)}
                                    >
                                        View Company
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}