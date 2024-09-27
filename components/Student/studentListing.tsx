'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, GraduationCap, Code, Search } from 'lucide-react'
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";

interface Student {
    _id: string
    name: string
    email: string
    skills: string[]
    tagline: string
    bio: string
    profilePhoto: string
    experience: { title: string; company: string }[]
    education: { degree: string; school: string }[]
    projects: { name: string; url: string }[]
}

export default function StudentsListing() {
    const router = useRouter();

    const [students, setStudents] = useState<Student[]>([])
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/students')
                const data = await response.json()
                setStudents(data)
                setFilteredStudents(data)
            } catch (error) {
                console.error("Error fetching students:", error)
            }
        }
        fetchStudents()
    }, [])

    useEffect(() => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredStudents(filtered)
    }, [searchTerm, students])

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Discover Talented Students</h1>
                <div className="relative w-full max-w-md mx-auto mb-12">
                    <Input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredStudents.map((student) => (
                        <Card key={student._id}
                              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-14 w-14">
                                    <AvatarImage src={student.profilePhoto} alt={student.name}/>
                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-xl">{student.name}</CardTitle>
                                    <p className="text-sm text-gray-500">{student.tagline}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4 line-clamp-2">{student.bio}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <Briefcase className="w-4 h-4 mr-2"/>
                                    {student.experience[0]?.title} at {student.experience[0]?.company}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <GraduationCap className="w-4 h-4 mr-2"/>
                                    {student.education[0]?.degree} from {student.education[0]?.school}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <Code className="w-4 h-4 mr-2"/>
                                    {student.projects[0]?.name}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {student.skills.slice(0, 5).map((skill, index) => (
                                        <Badge key={index} variant="outline">{skill}</Badge>
                                    ))}
                                    {student.skills.length > 5 && (
                                        <Badge variant="outline">+{student.skills.length - 5} more</Badge>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <Button
                                        variant="bordered"
                                        className="w-full text-green-600 border-green-600 hover:bg-green-50"
                                        onClick={() => router.push(`/student/${student._id}`)}
                                    >
                                        View Profile
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