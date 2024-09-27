'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, DollarSign, Clock, Users, ChevronRight, Globe2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Job {
    _id: string
    title: string
    company: string
    logo: string
    location: string
    salary: string
    proposals: number
    skills: string[]
    description: string
    experienceRequired: string
    remoteWork: string
}

function JobCard({ job }: { job: Job }) {
    const router = useRouter()

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={job.logo} alt={job.company}/>
                        <AvatarFallback>{job.company}</AvatarFallback>
                    </Avatar>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {job.title}
                    </Badge>
                </div>
                <h3 className="text-xl font-bold mt-2">{job.company}</h3>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2"/>
                        {job.location}
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2"/>
                        {job.salary}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2"/>
                        {job.experienceRequired} experience
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                            {skill}
                        </Badge>
                    ))}
                    {job.skills.length > 3 && (
                        <Badge variant="outline" className="bg-gray-100">
                            +{job.skills.length - 3}
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center text-sm text-gray-500">
                                <Globe2 className="w-4 h-4 mr-1"/>
                                <span>{job.remoteWork}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Job location</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center text-sm text-gray-500">
                                <Users className="w-4 h-4 mr-1"/>
                                <span>{job.proposals} proposals</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Number of applicants who have submitted proposals</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
            <div className="px-6 pb-6 flex justify-between items-center">
                <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={() => router.push(`/jobs/${job._id}`)}
                >
                    View Job
                </Button>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => router.push(`/jobs/${job._id}/congrats`)}
                >
                    Apply Now
                    <ChevronRight className="w-4 h-4 ml-2"/>
                </Button>
            </div>
        </Card>
    )
}

export default function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`/api/jobs/`)
                const data = await response.json()
                setJobs(data)
                setFilteredJobs(data)
            } catch (error) {
                console.error("Error fetching job details:", error)
            }
        }
        fetchJobs()
    }, [])

    useEffect(() => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredJobs(filtered)
    }, [searchTerm, jobs])

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">
                        Discover Your Dream Job
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Explore exciting opportunities at top tech companies
                    </p>
                    <div className="relative w-full max-w-2xl mx-auto">
                        <Input
                            type="text"
                            placeholder="Search jobs, companies, or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </header>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            {jobs.length > 0 ? "No matching jobs found" : "Loading..."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}