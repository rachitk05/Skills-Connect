import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, MapPin, DollarSign, Briefcase, Globe,  } from "lucide-react";
import {useRouter} from "next/navigation";

interface Leader {
    name: string;
    title: string;
    image: string;
    description: string;
}

interface Benefit {
    icon: any;
    text: string;
}

interface JobDetailsType {
    _id:string,
    title: string;
    company: string;
    logo: string;
    location: string;
    salary: string;
    visaSponsorship: boolean;
    remoteWork: string;
    skills: string[];
    description: string;
    minimumQualifications: string;
    responsibilities: string[];
    experienceRequired: string;
    leaders: Leader[];
    benefits: Benefit[];
}
interface JobDetailsProps {
    jobId: string;
}

export default function JobDetails({ jobId }: JobDetailsProps) {
    const router = useRouter();
    const [jobDetails, setJobDetails] = useState<JobDetailsType | null>(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`/api/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: JobDetailsType = await response.json();
                console.log(data);
                setJobDetails(data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        if (jobId) {
            fetchJobDetails();
        }
    }, [jobId]);

    if (!jobDetails) {
        return <div>Loading...</div>; // Loading state
    }
    console.log(jobDetails);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                    <img
                        src={jobDetails.logo}
                        alt={`${jobDetails.company} logo`}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{jobDetails.title}</h1>
                        <div className="flex items-center">
                            <Badge variant="secondary" className="mr-2">Now Hiring</Badge>
                            <span className="text-muted-foreground">{jobDetails.company}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">

                    <Button onClick={() => router.push(`/jobs/${jobDetails._id}/congrats`)} size="lg">Apply Now</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{jobDetails.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    <span className="font-semibold">{jobDetails.salary}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline">
                                    {jobDetails.visaSponsorship ? "Visa Sponsorship Available" : "No Visa Sponsorship"}
                                </Badge>
                                <Badge variant="outline">
                                    {jobDetails.remoteWork}
                                </Badge>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {jobDetails.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">About the Job</h3>
                                <p className="text-muted-foreground mb-4">{jobDetails.description}</p>
                                <h4 className="font-semibold mb-2">Minimum Qualifications</h4>
                                <p className="text-muted-foreground mb-4">{jobDetails.minimumQualifications}</p>
                                <h4 className="font-semibold mb-2">Responsibilities</h4>
                                <ul className="list-disc list-inside text-muted-foreground mb-4">
                                    {jobDetails.responsibilities.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ul>
                                <h4 className="font-semibold mb-2">Experience Required</h4>
                                <p className="text-muted-foreground">{jobDetails.experienceRequired}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
                            <ul className="space-y-4">
                                {jobDetails.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center">
                                        {/*<benefit.icon className="w-5 h-5 mr-3 text-primary" />*/}
                                        <span>{benefit.icon}</span>
                                        <span>{benefit.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Team & Culture</h3>
                            {jobDetails.leaders.map((leader, index) => (
                                <div key={index} className="flex items-start mb-4 last:mb-0">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{leader.name}</h4>
                                        <p className="text-sm text-muted-foreground mb-1">{leader.title}</p>
                                        <p className="text-sm">{leader.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4">Company Overview</h3>
                            <p className="text-muted-foreground mb-4">
                                {jobDetails.company} is a cutting-edge company specializing in developing innovative web applications. We are committed to pushing the boundaries of technology and creating solutions that make a difference.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Growing startup</span>
                                </div>
                                <div className="flex items-center">
                                    <Globe className="w-4 h-4 mr-2" />
                                    <span className="text-sm">techinnovations.com</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
