'use client'
import React, { useState } from "react";
import {Button, Checkbox, Input} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/components/Auth/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/Auth/EyeFilledIcon";
import {router} from "next/client";
import Link from "next/link";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (email === "") return false;

        return !validateEmail(email);
    }, [email]);

    // In your Login component
    const handleLogin = async () => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("response ok", response);
                localStorage.setItem('token', data.token);
                alert('Login successful');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login', error);
            alert('Error during login');
        }
    };



    return (
        <div className="bg-login min-h-screen bg-cover bg-center flex items-center justify-around">


            <div className="flex items-center justify-center">
                <div className="flex-col bg-white dark:bg-zinc-900  p-10 rounded-2xl max-w-md space-y-4">
                    <h3 className="font-bold text-xl mb-4">Log In</h3>
                    <Input
                        isRequired
                        type={"email"}
                        variant={"bordered"}
                        label={"Email"}
                        value={email}
                        onValueChange={setEmail}
                        className="max-w-sm flex items-end"
                        isInvalid={isInvalid}
                        color={isInvalid ? "danger" : "default"}
                        errorMessage="Please enter a valid email"
                    />
                    <Input
                        isRequired
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                                    aria-label="toggle password visibility">
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                )}
                            </button>
                        }
                        value={password}
                        onValueChange={setPassword}
                        type={isVisible ? "text" : "password"}
                        className="max-w-sm"
                    />
                    <div className="flex items-center justify-between">
                        <Checkbox size="sm">Remember Me</Checkbox>
                        <Link className={"text-gray-400"} href="/">Forgot password?</Link>
                    </div>

                    <br/>
                    <Button color="primary" className={"w-full"} onClick={handleLogin}>Log In</Button>


                    <div className={"flex items-center justify-between space-x-2"}>
                        <hr className={" size-1/2 bg-gray-200"}></hr>
                        <span>OR</span>
                        <hr className={" size-1/2"}></hr>
                    </div>


                    <div className={"flex-col items-center space-y-2"}>
                        <Button variant="bordered" className={"w-full"}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%"
                                 viewBox="0 0 48 48">
                                <path fill="#FFC107"
                                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00"
                                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50"
                                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2"
                                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Continue with Google
                        </Button>

                        <Button variant="bordered" className={"w-full"}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%"
                                 viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="30" fill="#4e6e91"></circle>
                                <path fill="#6693c1"
                                      d="M50,83c-18.196,0-33-14.804-33-33s14.804-33,33-33s33,14.804,33,33S68.196,83,50,83z M50,22 c-15.439,0-28,12.561-28,28s12.561,28,28,28s28-12.561,28-28S65.439,22,50,22z"></path>
                                <path fill="#eeecd9"
                                      d="M69.457,49.039c0-3.321-1.305-6.334-3.419-8.573c0.396-2.203,0.351-5.301-0.538-7.966 c-4.475,0-8.114,3.447-8.702,4H43.994c-0.589-0.552-4.019-4-8.494-4c-0.8,2.401-1.087,5.233-0.846,7.295 c-2.518,2.286-4.108,5.575-4.108,9.245c0,6.908,5.599,12.459,12.507,12.459H45.5c-2.003,0.917-3.635,2.756-4,5 c-2,0-4.864-0.182-6.181-2.158c-2.46-3.69-3.59-3.69-4.819-3.69c-1.23,0-1.33,1.23-0.1,2.46s1.23,1.23,2.46,3.69 C33.872,68.828,36.5,70.5,41.5,70.5v6.6c0,0,6.346,1.4,8.5,1.4s8.5-1.4,8.5-1.4l0-9.445c0-2.718-1.681-5.092-4-6.155h2.449 C63.858,61.5,69.457,55.947,69.457,49.039z"></path>
                                <path fill="#1f212b"
                                      d="M50,85c-19.299,0-35-15.701-35-35s15.701-35,35-35s35,15.701,35,35S69.299,85,50,85z M50,17 c-18.196,0-33,14.804-33,33s14.804,33,33,33s33-14.804,33-33S68.196,17,50,17z"></path>
                                <path fill="#1f212b"
                                      d="M50,79c-15.99,0-29-13.009-29-29s13.01-29,29-29s29,13.009,29,29c0,2.925-0.435,5.812-1.291,8.582 c-0.082,0.263-0.364,0.411-0.625,0.33c-0.264-0.082-0.412-0.361-0.33-0.625C77.581,55.612,78,52.825,78,50 c0-15.439-12.561-28-28-28S22,34.561,22,50s12.561,28,28,28c5.856,0,11.464-1.788,16.217-5.171c0.225-0.16,0.536-0.107,0.697,0.117 c0.16,0.225,0.107,0.537-0.117,0.697C61.873,77.147,56.065,79,50,79z"></path>
                                <path fill="#1f212b"
                                      d="M68.631,72.068c-0.14,0-0.279-0.059-0.378-0.173c-0.181-0.209-0.158-0.525,0.051-0.706 c0.739-0.638,1.452-1.324,2.122-2.037c0.188-0.202,0.505-0.21,0.706-0.023c0.201,0.189,0.212,0.505,0.023,0.707 c-0.693,0.739-1.433,1.449-2.197,2.11C68.863,72.028,68.747,72.068,68.631,72.068z"></path>
                                <path fill="#1f212b"
                                      d="M72.494,68.002c-0.107,0-0.216-0.035-0.308-0.105c-0.218-0.17-0.257-0.484-0.087-0.702 c1.649-2.118,2.982-4.452,3.963-6.938c0.101-0.258,0.392-0.382,0.648-0.282c0.257,0.102,0.383,0.392,0.281,0.648 c-1.015,2.575-2.396,4.993-4.104,7.186C72.79,67.936,72.643,68.002,72.494,68.002z"></path>
                                <path fill="#1f212b"
                                      d="M58.5,77.6c-0.276,0-0.5-0.224-0.5-0.5v-9.445c0-2.431-1.456-4.668-3.708-5.701 c-0.214-0.098-0.331-0.332-0.28-0.561C54.062,61.164,54.265,61,54.5,61h2.449c6.621,0,12.008-5.366,12.008-11.961 c0-3.064-1.166-5.987-3.282-8.229c-0.109-0.115-0.157-0.275-0.129-0.432c0.333-1.854,0.39-4.725-0.409-7.37 c-3.682,0.162-6.795,2.725-7.987,3.848C57.057,36.943,56.925,37,56.798,37H43.993c-0.127,0-0.249-0.048-0.342-0.135l-0.092-0.087 c-3.078-2.927-5.829-3.686-7.697-3.77c-0.662,2.162-0.941,4.762-0.712,6.729c0.019,0.16-0.042,0.319-0.161,0.428 c-2.506,2.275-3.943,5.51-3.943,8.875C31.046,55.635,36.433,61,43.053,61H45.5c0.235,0,0.438,0.164,0.488,0.394 c0.051,0.229-0.066,0.463-0.28,0.561c-1.974,0.904-3.397,2.676-3.715,4.625C41.954,66.822,41.745,67,41.5,67 c-2.333,0-5.191-0.271-6.598-2.38c-2.311-3.467-3.28-3.467-4.403-3.467c-0.14,0-0.385,0.023-0.448,0.178 c-0.086,0.206,0.031,0.756,0.702,1.428c1.287,1.287,1.311,1.335,2.554,3.82C34.409,68.785,37.319,70,41.5,70 c0.276,0,0.5,0.224,0.5,0.5v6.6c0,0.276-0.224,0.5-0.5,0.5S41,77.376,41,77.1v-6.105c-5.797-0.131-7.866-2.525-8.588-3.969 c-1.194-2.387-1.194-2.387-2.366-3.56c-0.869-0.869-1.213-1.81-0.919-2.518c0.209-0.505,0.709-0.795,1.372-0.795 c1.588,0,2.81,0.272,5.235,3.912c1.069,1.604,3.359,1.9,5.356,1.932c0.362-1.545,1.309-2.965,2.63-3.997h-0.668 c-7.172,0-13.007-5.813-13.007-12.959c0-3.562,1.485-6.988,4.084-9.442c-0.209-2.203,0.128-4.956,0.896-7.257 C35.094,32.138,35.285,32,35.5,32c2.036,0,5.192,0.696,8.692,4h12.409c1.427-1.311,4.847-4,8.898-4 c0.215,0,0.406,0.138,0.475,0.342c0.935,2.802,0.928,5.901,0.598,7.965c2.185,2.404,3.385,5.495,3.385,8.732 C69.957,56.186,64.122,62,56.949,62h-0.693C57.963,63.368,59,65.442,59,67.655V77.1C59,77.376,58.776,77.6,58.5,77.6z"></path>
                                <path fill="#1f212b"
                                      d="M34.238,45.97c-0.063,0-0.127-0.012-0.188-0.037c-0.256-0.104-0.379-0.396-0.274-0.651 c0.476-1.167,1.167-2.226,2.057-3.148c0.192-0.198,0.509-0.204,0.707-0.013c0.199,0.192,0.205,0.508,0.014,0.707 c-0.802,0.831-1.425,1.783-1.852,2.831C34.622,45.853,34.436,45.97,34.238,45.97z"></path>
                                <path fill="#1f212b"
                                      d="M33.66,51.021c-0.241,0-0.454-0.176-0.493-0.422c-0.08-0.51-0.121-1.034-0.121-1.558 c0-0.533,0.042-1.067,0.124-1.59c0.044-0.273,0.305-0.459,0.572-0.416c0.272,0.043,0.459,0.299,0.416,0.572 c-0.074,0.471-0.112,0.953-0.112,1.434c0,0.472,0.037,0.943,0.109,1.402c0.043,0.273-0.144,0.529-0.416,0.572 C33.713,51.019,33.687,51.021,33.66,51.021z"></path>
                                <path fill="#1f212b"
                                      d="M41.457,58.914c-0.028,0-0.057-0.002-0.085-0.007c-3.442-0.585-6.372-2.975-7.646-6.238 c-0.101-0.257,0.026-0.547,0.284-0.647c0.256-0.101,0.547,0.027,0.647,0.284c1.146,2.938,3.783,5.089,6.882,5.615 c0.271,0.046,0.455,0.305,0.409,0.577C41.907,58.741,41.696,58.914,41.457,58.914z"></path>
                            </svg>
                            Continue with Github
                        </Button>
                        <p>Already have an account? <Link href="/signup" className="text-blue-600">Sign Up</Link></p>
                    </div>
                </div>

            </div>


            <div className="relative bottom-32 self-end">

                <svg width="200" height="200" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.169 12.5625C18.169 14.996 16.1963 16.9688 13.7628 16.9688C11.3293 16.9688 9.35652 14.996 9.35652 12.5625C9.35652 10.129 11.3293 8.15625 13.7628 8.15625C16.1963 8.15625 18.169 10.129 18.169 12.5625Z"
                        fill="#fff"/>
                    <path
                        d="M1.28688 12.6732C0.199404 13.107 -0.342603 14.3496 0.233601 15.3688C1.42537 17.4768 3.0937 19.2895 5.11651 20.6552C7.72753 22.418 10.8084 23.3548 13.9588 23.3437C17.1092 23.3325 20.1834 22.3741 22.782 20.5928C24.7951 19.2128 26.4506 17.3885 27.6274 15.2721C28.1964 14.2489 27.6456 13.0101 26.5551 12.584C25.4646 12.1579 24.2507 12.7111 23.6314 13.7047C22.7987 15.0405 21.6956 16.1972 20.3847 17.0957C18.4878 18.396 16.2437 19.0957 13.9439 19.1038C11.6441 19.112 9.39501 18.4281 7.48897 17.1413C6.17183 16.252 5.06058 15.1031 4.21846 13.7732C3.5921 12.7841 2.37436 12.2394 1.28688 12.6732Z"
                        fill="#fff"/>
                    <path
                        d="M12.919 1.03125C12.919 0.461706 13.3807 0 13.9503 0C14.5198 0 14.9815 0.461706 14.9815 1.03125V5.34375C14.9815 5.91329 14.5198 6.375 13.9503 6.375C13.3807 6.375 12.919 5.91329 12.919 5.34375V1.03125Z"
                        fill="#fff"/>
                    <path
                        d="M22.9789 4.38545C23.3816 3.98273 24.0345 3.98273 24.4373 4.38545C24.84 4.78818 24.84 5.44113 24.4373 5.84386L21.3879 8.89326C20.9852 9.29599 20.3322 9.29599 19.9295 8.89326C19.5267 8.49053 19.5267 7.83758 19.9295 7.43485L22.9789 4.38545Z"
                        fill="#fff"/>
                    <path
                        d="M4.92947 4.38545C4.52674 3.98273 3.87379 3.98273 3.47107 4.38545C3.06834 4.78818 3.06834 5.44113 3.47107 5.84386L6.52046 8.89326C6.92319 9.29599 7.57614 9.29599 7.97887 8.89326C8.3816 8.49053 8.3816 7.83758 7.97887 7.43485L4.92947 4.38545Z"
                        fill="#fff"/>
                    <path
                        d="M7.66902 21.2812H20.2315V32.25C20.2315 34.3211 18.5526 36 16.4815 36H11.419C9.34795 36 7.66902 34.3211 7.66902 32.25V21.2812Z"
                        fill="#fff"/>
                    <path
                        d="M43.6505 9.0744C43.5993 8.55877 43.3799 8.1582 42.9921 7.87269C42.6043 7.58718 42.078 7.44442 41.4133 7.44442C40.9616 7.44442 40.5802 7.50834 40.2691 7.63619C39.958 7.75977 39.7194 7.93235 39.5532 8.15394C39.3912 8.37553 39.3103 8.62695 39.3103 8.9082C39.3018 9.14258 39.3508 9.34712 39.4573 9.52184C39.5681 9.69656 39.7194 9.84783 39.9111 9.97567C40.1029 10.0993 40.3245 10.2079 40.5759 10.3017C40.8273 10.3912 41.0958 10.4679 41.3813 10.5318L42.5574 10.813C43.1285 10.9409 43.6526 11.1113 44.1299 11.3244C44.6072 11.5375 45.0205 11.7995 45.3699 12.1106C45.7194 12.4217 45.99 12.7882 46.1817 13.21C46.3778 13.6319 46.4779 14.1156 46.4822 14.661C46.4779 15.4622 46.2733 16.1568 45.8685 16.7449C45.468 17.3287 44.8884 17.7825 44.1299 18.1064C43.3756 18.426 42.4658 18.5858 41.4005 18.5858C40.3437 18.5858 39.4232 18.4238 38.6391 18.1C37.8593 17.7761 37.2499 17.2967 36.811 16.6618C36.3763 16.0225 36.1483 15.2321 36.127 14.2903H38.8053C38.8351 14.7292 38.9608 15.0957 39.1824 15.3897C39.4083 15.6795 39.7087 15.899 40.0837 16.0481C40.463 16.193 40.8912 16.2654 41.3685 16.2654C41.8373 16.2654 42.2442 16.1973 42.5894 16.0609C42.9388 15.9245 43.2094 15.7349 43.4012 15.492C43.593 15.2491 43.6888 14.97 43.6888 14.6547C43.6888 14.3606 43.6015 14.1135 43.4268 13.9132C43.2563 13.7129 43.0049 13.5424 42.6725 13.4018C42.3444 13.2612 41.9417 13.1333 41.4644 13.0183L40.039 12.6603C38.9353 12.3919 38.0638 11.9721 37.4246 11.4011C36.7854 10.8301 36.468 10.0609 36.4722 9.09357C36.468 8.30096 36.6789 7.60849 37.105 7.01616C37.5354 6.42383 38.1256 5.96147 38.8756 5.62908C39.6256 5.2967 40.4779 5.1305 41.4324 5.1305C42.404 5.1305 43.252 5.2967 43.9765 5.62908C44.7052 5.96147 45.2719 6.42383 45.6768 7.01616C46.0816 7.60849 46.2904 8.29457 46.3032 9.0744H43.6505ZM50.4 15.5751L50.4064 12.3088H50.8027L53.9476 8.58221H57.0733L52.8482 13.5169H52.2026L50.4 15.5751ZM47.9327 18.4004V5.30948H50.6557V18.4004H47.9327ZM54.0691 18.4004L51.1799 14.1241L52.9952 12.2001L57.2587 18.4004H54.0691ZM58.0493 18.4004V8.58221H60.7723V18.4004H58.0493ZM59.4172 7.31658C59.0123 7.31658 58.665 7.18235 58.3753 6.91388C58.0897 6.64116 57.947 6.31516 57.947 5.9359C57.947 5.5609 58.0897 5.23917 58.3753 4.9707C58.665 4.69798 59.0123 4.56161 59.4172 4.56161C59.822 4.56161 60.1672 4.69798 60.4527 4.9707C60.7424 5.23917 60.8873 5.5609 60.8873 5.9359C60.8873 6.31516 60.7424 6.64116 60.4527 6.91388C60.1672 7.18235 59.822 7.31658 59.4172 7.31658ZM65.3166 5.30948V18.4004H62.5936V5.30948H65.3166ZM69.8609 5.30948V18.4004H67.1379V5.30948H69.8609ZM79.8512 11.3819L77.3583 11.5353C77.3157 11.3223 77.2241 11.1305 77.0834 10.96C76.9428 10.7853 76.7574 10.6468 76.5273 10.5446C76.3015 10.438 76.0309 10.3848 75.7155 10.3848C75.2937 10.3848 74.9378 10.4743 74.6481 10.6532C74.3583 10.8279 74.2134 11.0623 74.2134 11.3564C74.2134 11.5907 74.3072 11.7889 74.4947 11.9508C74.6822 12.1127 75.0039 12.2427 75.4599 12.3407L77.2368 12.6987C78.1914 12.8947 78.903 13.21 79.3718 13.6447C79.8405 14.0794 80.0749 14.6504 80.0749 15.3578C80.0749 16.0012 79.8853 16.5659 79.506 17.0517C79.131 17.5375 78.6154 17.9167 77.9591 18.1895C77.3072 18.4579 76.555 18.5922 75.7028 18.5922C74.403 18.5922 73.3675 18.3216 72.5962 17.7804C71.8292 17.2349 71.3796 16.4934 71.2475 15.5559L73.9258 15.4153C74.0067 15.8116 74.2028 16.1142 74.5138 16.323C74.8249 16.5275 75.2233 16.6298 75.7091 16.6298C76.1864 16.6298 76.5699 16.5382 76.8597 16.3549C77.1537 16.1674 77.3029 15.9267 77.3072 15.6326C77.3029 15.3855 77.1985 15.1831 76.9939 15.0254C76.7894 14.8635 76.4741 14.7399 76.0479 14.6547L74.3476 14.3159C73.3888 14.1241 72.6751 13.7917 72.2063 13.3187C71.7418 12.8457 71.5096 12.2427 71.5096 11.5098C71.5096 10.8791 71.68 10.3358 72.0209 9.87979C72.3661 9.42383 72.8498 9.07227 73.4719 8.82511C74.0983 8.57795 74.8313 8.45437 75.6708 8.45437C76.9108 8.45437 77.8867 8.71644 78.5983 9.24059C79.3143 9.76474 79.7319 10.4785 79.8512 11.3819ZM48.0993 25.8926H45.2996C45.2485 25.5304 45.1441 25.2086 44.9864 24.9274C44.8287 24.6419 44.6263 24.399 44.3792 24.1987C44.132 23.9984 43.8465 23.845 43.5226 23.7385C43.203 23.6319 42.8557 23.5787 42.4807 23.5787C41.8032 23.5787 41.213 23.747 40.7101 24.0836C40.2073 24.416 39.8174 24.9018 39.5404 25.541C39.2634 26.176 39.1249 26.9473 39.1249 27.8549C39.1249 28.7882 39.2634 29.5723 39.5404 30.2072C39.8216 30.8422 40.2137 31.3216 40.7165 31.6454C41.2194 31.9693 41.801 32.1312 42.4616 32.1312C42.8323 32.1312 43.1753 32.0822 43.4907 31.9842C43.8103 31.8862 44.0937 31.7434 44.3408 31.5559C44.588 31.3642 44.7925 31.1319 44.9545 30.8592C45.1207 30.5865 45.2357 30.2754 45.2996 29.926L48.0993 29.9387C48.0269 30.5396 47.8458 31.1191 47.556 31.6774C47.2705 32.2314 46.8849 32.7278 46.3991 33.1667C45.9175 33.6014 45.3422 33.9466 44.6732 34.2022C44.0084 34.4537 43.2563 34.5794 42.4168 34.5794C41.2492 34.5794 40.2052 34.3152 39.2847 33.7868C38.3685 33.2583 37.6441 32.4934 37.1114 31.492C36.583 30.4906 36.3188 29.2782 36.3188 27.8549C36.3188 26.4274 36.5873 25.2129 37.1242 24.2115C37.6611 23.21 38.3898 22.4473 39.3103 21.9231C40.2307 21.3947 41.2662 21.1305 42.4168 21.1305C43.1753 21.1305 43.8785 21.237 44.5262 21.4501C45.1782 21.6632 45.7556 21.9743 46.2584 22.3833C46.7613 22.7882 47.1704 23.2846 47.4857 23.8727C47.8053 24.4608 48.0099 25.1341 48.0993 25.8926ZM54.109 34.5922C53.1161 34.5922 52.2575 34.3812 51.533 33.9593C50.8129 33.5332 50.2567 32.9409 49.8647 32.1824C49.4727 31.4196 49.2766 30.5353 49.2766 29.5297C49.2766 28.5154 49.4727 27.6291 49.8647 26.8706C50.2567 26.1078 50.8129 25.5154 51.533 25.0936C52.2575 24.6674 53.1161 24.4544 54.109 24.4544C55.1019 24.4544 55.9584 24.6674 56.6786 25.0936C57.4031 25.5154 57.9613 26.1078 58.3533 26.8706C58.7454 27.6291 58.9414 28.5154 58.9414 29.5297C58.9414 30.5353 58.7454 31.4196 58.3533 32.1824C57.9613 32.9409 57.4031 33.5332 56.6786 33.9593C55.9584 34.3812 55.1019 34.5922 54.109 34.5922ZM54.1218 32.4828C54.5735 32.4828 54.9506 32.3549 55.2532 32.0993C55.5557 31.8393 55.7837 31.4856 55.9371 31.0382C56.0948 30.5907 56.1736 30.0815 56.1736 29.5105C56.1736 28.9395 56.0948 28.4302 55.9371 27.9828C55.7837 27.5353 55.5557 27.1816 55.2532 26.9217C54.9506 26.6618 54.5735 26.5318 54.1218 26.5318C53.6658 26.5318 53.2823 26.6618 52.9712 26.9217C52.6644 27.1816 52.4322 27.5353 52.2745 27.9828C52.1211 28.4302 52.0444 28.9395 52.0444 29.5105C52.0444 30.0815 52.1211 30.5907 52.2745 31.0382C52.4322 31.4856 52.6644 31.8393 52.9712 32.0993C53.2823 32.3549 53.6658 32.4828 54.1218 32.4828ZM63.075 28.7243V34.4004H60.352V24.5822H62.9472V26.3145H63.0622C63.2796 25.7434 63.6439 25.2917 64.1553 24.9593C64.6666 24.6227 65.2867 24.4544 66.0154 24.4544C66.6972 24.4544 67.2916 24.6035 67.7987 24.9018C68.3058 25.2001 68.7 25.6262 68.9813 26.1802C69.2625 26.7299 69.4031 27.3862 69.4031 28.149V34.4004H66.6801V28.6348C66.6844 28.0339 66.531 27.5652 66.2199 27.2285C65.9088 26.8876 65.4806 26.7172 64.9351 26.7172C64.5686 26.7172 64.2448 26.796 63.9635 26.9537C63.6865 27.1113 63.4692 27.3414 63.3115 27.644C63.1581 27.9423 63.0793 28.3024 63.075 28.7243ZM73.9123 28.7243V34.4004H71.1893V24.5822H73.7844V26.3145H73.8995C74.1168 25.7434 74.4812 25.2917 74.9925 24.9593C75.5039 24.6227 76.1239 24.4544 76.8526 24.4544C77.5344 24.4544 78.1289 24.6035 78.636 24.9018C79.1431 25.2001 79.5373 25.6262 79.8185 26.1802C80.0998 26.7299 80.2404 27.3862 80.2404 28.149V34.4004H77.5174V28.6348C77.5216 28.0339 77.3682 27.5652 77.0572 27.2285C76.7461 26.8876 76.3178 26.7172 75.7724 26.7172C75.4059 26.7172 75.082 26.796 74.8008 26.9537C74.5238 27.1113 74.3065 27.3414 74.1488 27.644C73.9954 27.9423 73.9165 28.3024 73.9123 28.7243ZM86.501 34.5922C85.491 34.5922 84.6217 34.3876 83.893 33.9785C83.1686 33.5652 82.6103 32.9814 82.2183 32.2271C81.8262 31.4686 81.6302 30.5716 81.6302 29.536C81.6302 28.5261 81.8262 27.6397 82.2183 26.877C82.6103 26.1142 83.1622 25.5197 83.8738 25.0936C84.5897 24.6674 85.4292 24.4544 86.3923 24.4544C87.04 24.4544 87.643 24.5588 88.2012 24.7676C88.7637 24.9721 89.2538 25.2811 89.6714 25.6944C90.0933 26.1078 90.4214 26.6277 90.6558 27.2541C90.8902 27.8762 91.0074 28.6049 91.0074 29.4402V30.188H82.7169V28.5005H88.4441C88.4441 28.1085 88.3589 27.7612 88.1885 27.4586C88.018 27.1561 87.7815 26.9196 87.4789 26.7491C87.1807 26.5744 86.8334 26.487 86.437 26.487C86.0237 26.487 85.6572 26.5829 85.3376 26.7747C85.0223 26.9622 84.7751 27.2157 84.5961 27.5353C84.4172 27.8507 84.3255 28.2022 84.3213 28.59V30.1944C84.3213 30.6802 84.4108 31.1 84.5897 31.4537C84.773 31.8074 85.0308 32.0801 85.3632 32.2718C85.6956 32.4636 86.0897 32.5595 86.5457 32.5595C86.8483 32.5595 87.1253 32.5169 87.3767 32.4316C87.6281 32.3464 87.8433 32.2186 88.0223 32.0481C88.2012 31.8777 88.3376 31.6689 88.4314 31.4217L90.9498 31.5879C90.822 32.193 90.5599 32.7214 90.1636 33.1731C89.7716 33.6206 89.2645 33.97 88.6423 34.2214C88.0244 34.4686 87.3106 34.5922 86.501 34.5922ZM96.8604 34.5922C95.8547 34.5922 94.9897 34.3791 94.2653 33.9529C93.5451 33.5225 92.9911 32.926 92.6033 32.1632C92.2198 31.4004 92.028 30.5225 92.028 29.5297C92.028 28.524 92.2219 27.6419 92.6097 26.8833C93.0018 26.1206 93.5579 25.5261 94.278 25.1C94.9982 24.6696 95.8547 24.4544 96.8476 24.4544C97.7042 24.4544 98.4542 24.6099 99.0976 24.921C99.7411 25.2321 100.25 25.6689 100.625 26.2314C101 26.7939 101.207 27.4544 101.245 28.2129H98.6758C98.6033 27.7228 98.4116 27.3287 98.1005 27.0304C97.7937 26.7278 97.391 26.5765 96.8924 26.5765C96.4705 26.5765 96.1019 26.6916 95.7866 26.9217C95.4755 27.1475 95.2326 27.4778 95.0579 27.9125C94.8832 28.3471 94.7958 28.8734 94.7958 29.4913C94.7958 30.1177 94.881 30.6504 95.0515 31.0893C95.2262 31.5282 95.4712 31.8627 95.7866 32.0929C96.1019 32.323 96.4705 32.438 96.8924 32.438C97.2035 32.438 97.4826 32.3741 97.7297 32.2463C97.9812 32.1184 98.1878 31.9331 98.3498 31.6902C98.516 31.443 98.6246 31.1468 98.6758 30.8017H101.245C101.203 31.5517 100.998 32.2122 100.632 32.7832C100.27 33.35 99.7688 33.7931 99.1296 34.1127C98.4904 34.4324 97.734 34.5922 96.8604 34.5922ZM107.851 24.5822V26.6277H101.938V24.5822H107.851ZM103.281 22.2299H106.004V31.3833C106.004 31.6348 106.042 31.8308 106.119 31.9714C106.196 32.1078 106.302 32.2037 106.438 32.2591C106.579 32.3145 106.741 32.3422 106.924 32.3422C107.052 32.3422 107.18 32.3315 107.308 32.3102C107.436 32.2846 107.534 32.2654 107.602 32.2527L108.03 34.2789C107.894 34.3216 107.702 34.3706 107.455 34.426C107.208 34.4856 106.907 34.5218 106.554 34.5346C105.897 34.5602 105.322 34.4728 104.828 34.2725C104.338 34.0723 103.956 33.7612 103.683 33.3393C103.411 32.9174 103.277 32.3848 103.281 31.7413V22.2299Z"
                        fill="#fff"/>
                </svg>

            </div>



        </div>

    )
        ;

}
