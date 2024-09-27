import { CardContent, Card } from "@/components/ui/card"
import {LightbulbIcon, RocketIcon, UsersIcon} from "lucide-react";
import Link from "next/link";
import Header from "@/components/home/navbar";
export default function AboutUs() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <main className="flex-1 mx-5">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black rounded-3xl  my-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                    Empowering Student Talent
                                </h1>
                                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                                    Bridging the gap between academic skills and real-world opportunities
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 rounded-3xl">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Vision</h2>
                                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Skill Connect is a student-focused freelancing and project-based platform designed to provide students
                                    with the opportunity to turn their skills into a sustainable side income. We're revolutionizing the
                                    way students gain practical experience and earn while they learn.
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    alt="Vision Illustration"
                                    className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
                                    height="400"
                                    src="https://img.freepik.com/free-vector/vision-statement-concept-illustration_114360-7576.jpg?t=st=1727429128~exp=1727432728~hmac=f70eee4cf26423b082e44e75e93e89af00c57b34d9f8896321f47188493a4fd1&w=1480"
                                    width="600"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 rounded-3xl">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            What Sets Us Apart
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
                            <Card>
                                <CardContent className="p-6">
                                    <LightbulbIcon className="h-12 w-12 mb-4 text-purple-500" />
                                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        We're constantly pushing the boundaries of what's possible in student freelancing.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <UsersIcon className="h-12 w-12 mb-4 text-pink-500" />
                                    <h3 className="text-xl font-bold mb-2">Community</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        We foster a supportive environment where students can learn, grow, and collaborate.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <RocketIcon className="h-12 w-12 mb-4 text-red-500" />
                                    <h3 className="text-xl font-bold mb-2">Opportunity</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        We connect talented students with real-world projects that kickstart their careers.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex items-center justify-center">
                                <img
                                    alt="Team Illustration"
                                    className="aspect-[4/3] overflow-hidden rounded-xl object-cover object-center"
                                    height="400"
                                    src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3621.jpg?t=st=1727429261~exp=1727432861~hmac=8fd57912e4d0f2caf6520ec13b8b18525022943dda79a24ae64345b9ba9bca9c&w=1480"
                                    width="600"
                                />
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community</h2>
                                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Whether you're a student looking to showcase your skills or a company seeking fresh talent, Skill
                                    Connect is your platform. Join us in shaping the future of work and education.
                                </p>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                        href="/signup"
                                    >
                                        Get Started
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col justify-center gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Skill Connect. All rights reserved.</p>
            </footer>
        </div>
    )
}