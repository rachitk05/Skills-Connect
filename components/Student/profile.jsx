'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Pencil, Coffee, LinkIcon, PlusCircle, X } from 'lucide-react'

const initialProfileData = {
    name: "Charlotte King",
    email: "charlotte.king@example.com",
    skills: ["iOS Development", "Swift", "SwiftUI", "UIKit", "Xcode", "Git", "RESTful APIs", "Core Data", "Firebase", "UI/UX Design"],
    certifications: [
        "Apple Certified iOS Developer",
        "AWS Certified Developer - Associate",
        "Scrum Alliance Certified ScrumMaster"
    ],
    portfolio: "https://www.charlottekingportfolio.com",
    experience: [
        {
            title: "iOS Developer Intern",
            company: "Mobile Solutions Inc.",
            duration: "9 months",
            description: "Developed and maintained iOS applications, collaborated with cross-functional teams, and implemented new features using Swift and UIKit."
        },
        {
            title: "Freelance iOS Developer",
            company: "Self-employed",
            duration: "1 year",
            description: "Created custom iOS applications for small businesses and startups, focusing on clean code and intuitive user interfaces."
        }
    ],
    education: [
        {
            degree: "Bachelor of Science in Mobile App Development",
            school: "Drexel University",
            year: "2023"
        },
        {
            degree: "iOS Development Bootcamp",
            school: "App Academy",
            year: "2022"
        }
    ],
    age: 21,
    bio: "Passionate iOS developer with a keen eye for design and a drive for creating intuitive mobile applications. I thrive on turning complex problems into simple, beautiful, and intuitive interface designs. When I'm not coding, you'll find me exploring new coffee shops or contributing to open-source projects.",
    profilePhoto: "",
    tagline: "Crafting Tomorrow's Apps, One Line at a Time",
    projects: [
        {
            name: "EcoTrack",
            url: "https://github.com/charlotteking/EcoTrack",
            description: "An iOS app that helps users track and reduce their carbon footprint through daily challenges and tips."
        },
        {
            name: "MindfulMinutes",
            url: "https://github.com/charlotteking/MindfulMinutes",
            description: "A meditation and mindfulness app with customizable sessions and progress tracking."
        },
        {
            name: "SwiftRecipes",
            url: "https://github.com/charlotteking/SwiftRecipes",
            description: "A recipe management app that uses Core Data for local storage and integrates with a recipe API."
        }
    ],
    interests: ["Mobile Technology", "UI/UX Design", "Artificial Intelligence", "Sustainable Tech", "Coffee Brewing"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"]
}

export default function EditableProfileDisplay() {
    const [profileData, setProfileData] = useState(initialProfileData)
    const [isEditing, setIsEditing] = useState(false)

    const handleInputChange = (e, section = null, index = null) => {
        const { name, value } = e.target
        if (section && index !== null) {
            setProfileData(prev => ({
                ...prev,
                [section]: prev[section].map((item, i) =>
                    i === index ? { ...item, [name]: value } : item
                )
            }))
        } else if (section) {
            setProfileData(prev => ({
                ...prev,
                [section]: { ...prev[section], [name]: value }
            }))
        } else {
            setProfileData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleArrayChange = (section, index, value) => {
        setProfileData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => i === index ? value : item)
        }))
    }

    const addArrayItem = (section, item = '') => {
        setProfileData(prev => ({
            ...prev,
            [section]: [...prev[section], item]
        }))
    }

    const removeArrayItem = (section, index) => {
        setProfileData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }))
    }

    const handleSave = () => {
        console.log(profileData)
        setIsEditing(false)
    }

    const renderEditDialog = () => (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" value={profileData.email} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" type="number" value={profileData.age} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input id="tagline" name="tagline" value={profileData.tagline} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input id="portfolio" name="portfolio" value={profileData.portfolio} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Skills</Label>
                        {profileData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <Input
                                    value={skill}
                                    onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                                    className="mr-2"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('skills', index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('skills')} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                        </Button>
                    </div>
                    <div>
                        <Label>Experience</Label>
                        {profileData.experience.map((exp, index) => (
                            <div key={index} className="border p-4 rounded-md mt-2">
                                <Input
                                    placeholder="Title"
                                    name="title"
                                    value={exp.title}
                                    onChange={(e) => handleInputChange(e, 'experience', index)}
                                    className="mb-2"
                                />
                                <Input
                                    placeholder="Company"
                                    name="company"
                                    value={exp.company}
                                    onChange={(e) => handleInputChange(e, 'experience', index)}
                                    className="mb-2"
                                />
                                <Input
                                    placeholder="Duration"
                                    name="duration"
                                    value={exp.duration}
                                    onChange={(e) => handleInputChange(e, 'experience', index)}
                                    className="mb-2"
                                />
                                <Textarea
                                    placeholder="Description"
                                    name="description"
                                    value={exp.description}
                                    onChange={(e) => handleInputChange(e, 'experience', index)}
                                />
                                <Button type="button" variant="ghost" onClick={() => removeArrayItem('experience', index)} className="mt-2">
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('experience', { title: '', company: '', duration: '', description: '' })} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Experience
                        </Button>
                    </div>
                    <div>
                        <Label>Education</Label>
                        {profileData.education.map((edu, index) => (
                            <div key={index} className="border p-4 rounded-md mt-2">
                                <Input
                                    placeholder="Degree"
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleInputChange(e, 'education', index)}
                                    className="mb-2"
                                />
                                <Input
                                    placeholder="School"
                                    name="school"
                                    value={edu.school}
                                    onChange={(e) => handleInputChange(e, 'education', index)}
                                    className="mb-2"
                                />
                                <Input
                                    placeholder="Year"
                                    name="year"
                                    value={edu.year}
                                    onChange={(e) => handleInputChange(e, 'education', index)}
                                />
                                <Button type="button" variant="ghost" onClick={() => removeArrayItem('education', index)} className="mt-2">
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('education', { degree: '', school: '', year: '' })} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Education
                        </Button>
                    </div>
                    <div>
                        <Label>Certifications</Label>
                        {profileData.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <Input
                                    value={cert}
                                    onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                                    className="mr-2"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('certifications', index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('certifications')} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Certification
                        </Button>
                    </div>
                    <div>
                        <Label>Projects</Label>
                        {profileData.projects.map((project, index) => (
                            <div key={index} className="border p-4 rounded-md mt-2">
                                <Input
                                    placeholder="Project Name"
                                    name="name"
                                    value={project.name}
                                    onChange={(e) => handleInputChange(e, 'projects', index)}
                                    className="mb-2"
                                />
                                <Input
                                    placeholder="Project URL"
                                    name="url"
                                    value={project.url}
                                    onChange={(e) => handleInputChange(e, 'projects', index)}
                                    className="mb-2"
                                />
                                <Textarea
                                    placeholder="Project Description"
                                    name="description"
                                    value={project.description}
                                    onChange={(e) => handleInputChange(e, 'projects', index)}
                                />
                                <Button type="button" variant="ghost" onClick={() => removeArrayItem('projects', index)} className="mt-2">
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('projects', { name: '', url: '', description: '' })} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Project
                        </Button>
                    </div>
                    <div>
                        <Label>Interests</Label>
                        {profileData.interests.map((interest, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <Input
                                    value={interest}
                                    onChange={(e) => handleArrayChange('interests', index, e.target.value)}
                                    className="mr-2"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('interests', index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('interests')} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Interest
                        </Button>
                    </div>
                    <div>
                        <Label>Languages</Label>
                        {profileData.languages.map((language, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <Input
                                    value={language}
                                    onChange={(e) => handleArrayChange('languages', index, e.target.value)}
                                    className="mr-2"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('languages', index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => addArrayItem('languages')} className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Language
                        </Button>
                    </div>
                </div>
                <Button onClick={handleSave}>Save changes</Button>
            </DialogContent>
        </Dialog>
    )

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-1/3">
                                <div className="sticky top-8">
                                    <Image
                                        src={profileData.profilePhoto}
                                        alt={profileData.name}
                                        width={150}
                                        height={150}
                                        className="rounded-full mx-auto mb-4 border-1"
                                    />
                                    <h1 className="text-3xl font-bold text-center mb-2">{profileData.name}</h1>
                                    <p className="text-gray-600 text-center mb-4">{profileData.tagline}</p>
                                    <div className="flex justify-center mb-4">
                                        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50" onClick={() => setIsEditing(true)}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="flex items-center text-gray-600">
                                            <Coffee className="mr-2 h-4 w-4" />
                                            Age: {profileData.age}
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            <a href={`mailto:${profileData.email}`} className="hover:underline">{profileData.email}</a>
                                        </p>
                                        <p className="flex items-center text-gray-600">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                                    <p className="text-gray-700 mb-4">{profileData.bio}</p>
                                </section>

                                <Separator className="my-8" />

                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Experience</h2>
                                    {profileData.experience.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="text-xl font-medium">{exp.title}</h3>
                                            <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                                            <p className="mt-2">{exp.description}</p>
                                        </div>
                                    ))}
                                </section>

                                <Separator className="my-8" />

                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Education</h2>
                                    {profileData.education.map((edu, index) => (
                                        <div key={index} className="mb-2">
                                            <p className="font-medium">{edu.degree}</p>
                                            <p className="text-gray-600">{edu.school}, {edu.year}</p>
                                        </div>
                                    ))}
                                </section>

                                <Separator className="my-8" />

                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.skills.map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-blue-600 border-blue-600">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </section>

                                <Separator className="my-8" />

                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                                    {profileData.projects.map((project, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="text-xl font-medium">
                                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {project.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1">{project.description}</p>
                                        </div>
                                    ))}
                                </section>

                                <Separator className="my-8" />

                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
                                    <ul className="list-disc list-inside">
                                        {profileData.certifications.map((cert, index) => (
                                            <li key={index} className="text-gray-700 mb-1">{cert}</li>
                                        ))}
                                    </ul>
                                </section>

                                <Separator className="my-8" />

                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Interests</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.interests.map((interest, index) => (
                                            <Badge key={index} variant="secondary">{interest}</Badge>
                                        ))}
                                    </div>
                                </section>

                                <Separator className="my-8" />

                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">Languages</h2>
                                    <ul className="list-disc list-inside">
                                        {profileData.languages.map((language, index) => (
                                            <li key={index} className="text-gray-700">{language}</li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            {renderEditDialog()}
        </div>
    )
}