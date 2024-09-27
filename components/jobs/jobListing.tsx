import { useState, useEffect } from 'react';
import {MapPin, DollarSign, Clock, Users, ChevronRight, Search, Globe, Globe2} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@nextui-org/input";
import {useRouter} from "next/navigation";

interface Job {
    _id: string;
    title: string;
    company: string;
    logo: string;
    location: string;
    salary: string;
    proposals: number;
    skills: string[];
    description: string;
    experienceRequired: string;
    remoteWork:string;
}

const categoryColors: Record<string, string> = {
    "Software Engineer": "from-blue-400 to-blue-600",
    "Data Analyst": "from-green-400 to-green-600",
    "Product Manager": "from-purple-400 to-purple-600"
};

function JobCard({ job }: { job: Job }) {
    const gradientClass = categoryColors[job.title] || "from-blue-400 to-gray-800";
    const router = useRouter();
    console.log(job)
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col">
            <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
            <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <Avatar className={`h-12 w-12 ring-2 ring-opacity-50 ring-${gradientClass.split('-')[2]}`}>
                        <AvatarImage src={job.logo} alt={job.company} />
                        {/*<AvatarFallback>{job.company[0]}</AvatarFallback>*/}
                    </Avatar>
                    <Badge variant="secondary" className={`bg-gradient-to-r ${gradientClass} text-white`}>
                        {job.title}
                    </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{job.company}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.experienceRequired} experience
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">{skill}</Badge>
                    ))}
                </div>
            </div>
            <div className="px-6 pb-6">
                <div className="flex justify-between items-center mb-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Globe2 className="w-4 h-4 mr-1" />
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
                                    <Users className="w-4 h-4 mr-1" />
                                    <span>{job.proposals} proposals</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Number of applicants who have submitted proposals</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={()=>router.push(`/jobs/${job._id}`)}>
                    Apply Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`/api/jobs/`);
                const data = await response.json();
                setJobs(data);
                setFilteredJobs(data); // Initialize filteredJobs with all jobs
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
    }, [searchTerm, jobs]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Discover Your Dream Job
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Explore exciting opportunities at top tech companies
                    </p>
                        <div className="relative w-full max-w-md">
                            <Input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </header>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jobs;
