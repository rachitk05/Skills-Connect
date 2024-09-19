'use client'
import React from "react";
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/input";

export default function Section1()  {
    return (
        <section>
            <div className="flex flex-col gap-10 justify-center items-center rounded-2xl p-32 lg:mx-64 md-mx-48 my-10 text-white bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/678686c47c024e18e773c75e90aaab1c-1705999902381/hero-xl-x1.png')] bg-no-repeat	 bg-cover	">
                <h1 className={"text-5xl"}>Find the right <span className={"text-green-500 italic"}>freelance</span><br/> service, right away</h1>
                <div className="flex justify-center items-center w-full">
                    <Input type="text" variant={"bordered"} className={"bg-white text-black rounded-2xl w-[50%]"} size={"lg"} label="Search for any Service" />
                    <button className={"relative right-16"}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                             viewBox="0 0 100 100">
                            <path fill="#fff"
                                  d="M87.215,56.71C88.35,54.555,89,52.105,89,49.5c0-6.621-4.159-12.257-10.001-14.478 C78.999,35.015,79,35.008,79,35c0-11.598-9.402-21-21-21c-9.784,0-17.981,6.701-20.313,15.757C36.211,29.272,34.638,29,33,29 c-7.692,0-14.023,5.793-14.89,13.252C12.906,43.353,9,47.969,9,53.5C9,59.851,14.149,65,20.5,65c0.177,0,0.352-0.012,0.526-0.022 C21.022,65.153,21,65.324,21,65.5C21,76.822,30.178,86,41.5,86c6.437,0,12.175-2.972,15.934-7.614C59.612,80.611,62.64,82,66,82 c4.65,0,8.674-2.65,10.666-6.518C77.718,75.817,78.837,76,80,76c6.075,0,11-4.925,11-11C91,61.689,89.53,58.727,87.215,56.71z"></path>
                            <path fill="#fdfcef"
                                  d="M79.875,60.5c0,0,3.64,0,6.125,0s4.5-2.015,4.5-4.5c0-2.333-1.782-4.229-4.055-4.455 C86.467,51.364,86.5,51.187,86.5,51c0-2.485-2.015-4.5-4.5-4.5c-1.438,0-2.703,0.686-3.527,1.736 C78.333,45.6,76.171,43.5,73.5,43.5c-2.761,0-5,2.239-5,5c0,0.446,0.077,0.87,0.187,1.282C68.045,49.005,67.086,48.5,66,48.5 c-1.781,0-3.234,1.335-3.455,3.055C62.364,51.533,62.187,51.5,62,51.5c-2.485,0-4.5,2.015-4.5,4.5s2.015,4.5,4.5,4.5s9.5,0,9.5,0 h5.375V61h3V60.5z"></path>
                            <path fill="#472b29"
                                  d="M73.5,43c-3.033,0-5.5,2.467-5.5,5.5c0,0.016,0,0.031,0,0.047C67.398,48.192,66.71,48,66,48 c-1.831,0-3.411,1.261-3.858,3.005C62.095,51.002,62.048,51,62,51c-2.757,0-5,2.243-5,5s2.243,5,5,5h14.875 c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5H62c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.117,0,0.23,0.017,0.343,0.032l0.141,0.019 c0.021,0.003,0.041,0.004,0.062,0.004c0.246,0,0.462-0.185,0.495-0.437C63.232,50.125,64.504,49,66,49 c0.885,0,1.723,0.401,2.301,1.1c0.098,0.118,0.241,0.182,0.386,0.182c0.078,0,0.156-0.018,0.228-0.056 c0.209-0.107,0.314-0.346,0.254-0.573C69.054,49.218,69,48.852,69,48.5c0-2.481,2.019-4.5,4.5-4.5 c2.381,0,4.347,1.872,4.474,4.263c0.011,0.208,0.15,0.387,0.349,0.45c0.05,0.016,0.101,0.024,0.152,0.024 c0.15,0,0.296-0.069,0.392-0.192C79.638,47.563,80.779,47,82,47c2.206,0,4,1.794,4,4c0,0.117-0.017,0.23-0.032,0.343l-0.019,0.141 c-0.016,0.134,0.022,0.268,0.106,0.373c0.084,0.105,0.207,0.172,0.34,0.185C88.451,52.247,90,53.949,90,56c0,2.206-1.794,4-4,4 h-6.125c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H86c2.757,0,5-2.243,5-5c0-2.397-1.689-4.413-4.003-4.877 C86.999,51.082,87,51.041,87,51c0-2.757-2.243-5-5-5c-1.176,0-2.293,0.416-3.183,1.164C78.219,44.76,76.055,43,73.5,43L73.5,43z"></path>
                            <path fill="#472b29"
                                  d="M72 50c-1.403 0-2.609.999-2.913 2.341C68.72 52.119 68.301 52 67.875 52c-1.202 0-2.198.897-2.353 2.068C65.319 54.022 65.126 54 64.938 54c-1.529 0-2.811 1.2-2.918 2.732C62.01 56.87 62.114 56.99 62.251 57c.006 0 .012 0 .018 0 .13 0 .24-.101.249-.232.089-1.271 1.151-2.268 2.419-2.268.229 0 .47.042.738.127.022.007.045.01.067.01.055 0 .11-.02.156-.054C65.962 54.537 66 54.455 66 54.375c0-1.034.841-1.875 1.875-1.875.447 0 .885.168 1.231.473.047.041.106.063.165.063.032 0 .063-.006.093-.019.088-.035.148-.117.155-.212C69.623 51.512 70.712 50.5 72 50.5c.208 0 .425.034.682.107.023.007.047.01.07.01.109 0 .207-.073.239-.182.038-.133-.039-.271-.172-.309C72.517 50.04 72.256 50 72 50L72 50zM85.883 51.5c-1.326 0-2.508.897-2.874 2.182-.038.133.039.271.172.309C83.205 53.997 83.228 54 83.25 54c.109 0 .209-.072.24-.182C83.795 52.748 84.779 52 85.883 52c.117 0 .23.014.342.029.012.002.023.003.035.003.121 0 .229-.092.246-.217.019-.137-.077-.263-.214-.281C86.158 51.516 86.022 51.5 85.883 51.5L85.883 51.5z"></path>
                            <path fill="#fff"
                                  d="M15.405 51H5.5C5.224 51 5 50.776 5 50.5S5.224 50 5.5 50h9.905c.276 0 .5.224.5.5S15.682 51 15.405 51zM18.5 51h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5S18.777 51 18.5 51zM23.491 53H14.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8.991c.276 0 .5.224.5.5S23.767 53 23.491 53zM12.5 53h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5S12.777 53 12.5 53zM9.5 53h-2C7.224 53 7 52.776 7 52.5S7.224 52 7.5 52h2c.276 0 .5.224.5.5S9.777 53 9.5 53zM15.5 55h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S15.776 55 15.5 55zM18.5 46c-.177 0-.823 0-1 0-.276 0-.5.224-.5.5 0 .276.224.5.5.5.177 0 .823 0 1 0 .276 0 .5-.224.5-.5C19 46.224 18.776 46 18.5 46zM18.5 48c-.177 0-4.823 0-5 0-.276 0-.5.224-.5.5 0 .276.224.5.5.5.177 0 4.823 0 5 0 .276 0 .5-.224.5-.5C19 48.224 18.776 48 18.5 48zM23.5 50c-.177 0-2.823 0-3 0-.276 0-.5.224-.5.5 0 .276.224.5.5.5.177 0 2.823 0 3 0 .276 0 .5-.224.5-.5C24 50.224 23.776 50 23.5 50zM72.5 24h-10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10c.276 0 .5.224.5.5S72.776 24 72.5 24zM76.5 24h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S76.776 24 76.5 24zM81.5 26h-10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10c.276 0 .5.224.5.5S81.777 26 81.5 26zM69.5 26h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5S69.776 26 69.5 26zM66.375 26H64.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1.875c.276 0 .5.224.5.5S66.651 26 66.375 26zM75.5 22h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S75.777 22 75.5 22zM72.5 28h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S72.776 28 72.5 28z"></path>
                            <g>
                                <path fill="#48bed8"
                                      d="M37,71.3c-4.025,0-7.3-3.274-7.3-7.3V36c0-4.025,3.274-7.3,7.3-7.3h28c4.025,0,7.3,3.274,7.3,7.3 v28c0,4.025-3.274,7.3-7.3,7.3H37z"></path>
                                <path fill="#472b29"
                                      d="M65,29.4c3.639,0,6.6,2.961,6.6,6.6v28c0,3.639-2.961,6.6-6.6,6.6H37c-3.639,0-6.6-2.961-6.6-6.6 V36c0-3.639,2.961-6.6,6.6-6.6H65 M65,28H37c-4.418,0-8,3.582-8,8v28c0,4.418,3.582,8,8,8h28c4.418,0,8-3.582,8-8V36 C73,31.582,69.418,28,65,28L65,28z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M68.446,47.511c-0.276,0-0.5-0.224-0.5-0.5v-3.706c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5 v3.706C68.946,47.287,68.722,47.511,68.446,47.511z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M68.508,41.06c-0.276,0-0.5-0.224-0.5-0.5v-1.913c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5 v1.913C69.008,40.836,68.785,41.06,68.508,41.06z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M64.251,67.938H37.812c-2.619,0-4.749-2.131-4.749-4.749V36.749c0-2.618,2.13-4.749,4.749-4.749 h23.96c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5h-23.96c-2.067,0-3.749,1.682-3.749,3.749v26.439 c0,2.067,1.682,3.749,3.749,3.749h26.439c2.067,0,3.749-1.682,3.749-3.749V49.614c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5 v13.574C69,65.807,66.87,67.938,64.251,67.938z"></path>
                            </g>
                            <g>
                                <path fill="#fdfcef"
                                      d="M36.5,73.5c0,0,1.567,0,3.5,0s3.5-1.567,3.5-3.5c0-1.781-1.335-3.234-3.055-3.455 C40.473,66.366,40.5,66.187,40.5,66c0-1.933-1.567-3.5-3.5-3.5c-1.032,0-1.95,0.455-2.59,1.165 c-0.384-1.808-1.987-3.165-3.91-3.165c-2.209,0-4,1.791-4,4c0,0.191,0.03,0.374,0.056,0.558C26.128,64.714,25.592,64.5,25,64.5 c-1.228,0-2.245,0.887-2.455,2.055C22.366,66.527,22.187,66.5,22,66.5c-1.933,0-3.5,1.567-3.5,3.5s1.567,3.5,3.5,3.5s7.5,0,7.5,0 V74h7V73.5z"></path>
                                <path fill="#472b29"
                                      d="M38.25 69C38.112 69 38 68.888 38 68.75c0-1.223.995-2.218 2.218-2.218.034.009.737-.001 1.244.136.133.036.212.173.176.306-.036.134-.173.213-.306.176-.444-.12-1.1-.12-1.113-.118-.948 0-1.719.771-1.719 1.718C38.5 68.888 38.388 69 38.25 69zM31.5 73A.5.5 0 1 0 31.5 74 .5.5 0 1 0 31.5 73z"></path>
                                <path fill="#472b29"
                                      d="M40,74h-3.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H40c1.654,0,3-1.346,3-3 c0-1.496-1.125-2.768-2.618-2.959c-0.134-0.018-0.255-0.088-0.336-0.196s-0.115-0.244-0.094-0.377C39.975,66.314,40,66.16,40,66 c0-1.654-1.346-3-3-3c-0.85,0-1.638,0.355-2.219,1c-0.125,0.139-0.321,0.198-0.5,0.148c-0.182-0.049-0.321-0.195-0.36-0.379 C33.58,62.165,32.141,61,30.5,61c-1.93,0-3.5,1.57-3.5,3.5c0,0.143,0.021,0.28,0.041,0.418c0.029,0.203-0.063,0.438-0.242,0.54 c-0.179,0.102-0.396,0.118-0.556-0.01C25.878,65.155,25.449,65,25,65c-0.966,0-1.792,0.691-1.963,1.644 c-0.048,0.267-0.296,0.446-0.569,0.405C22.314,67.025,22.16,67,22,67c-1.654,0-3,1.346-3,3s1.346,3,3,3h7.5 c0.276,0,0.5,0.224,0.5,0.5S29.776,74,29.5,74H22c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.059,0,0.116,0.002,0.174,0.006 C22.588,64.82,23.711,64,25,64c0.349,0,0.689,0.061,1.011,0.18C26.176,61.847,28.126,60,30.5,60c1.831,0,3.466,1.127,4.153,2.774 C35.333,62.276,36.155,62,37,62c2.206,0,4,1.794,4,4c0,0.048-0.001,0.095-0.004,0.142C42.739,66.59,44,68.169,44,70 C44,72.206,42.206,74,40,74z"></path>
                                <path fill="#472b29"
                                      d="M34.5,73c-0.159,0-0.841,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.159,0,0.841,0,1,0c0.276,0,0.5-0.224,0.5-0.5C35,73.224,34.776,73,34.5,73z"></path>
                            </g>
                            <g>
                                <path fill="#da914b"
                                      d="M62.95,63.449c-0.401,0-0.777-0.155-1.061-0.438l-9.899-9.899c-0.585-0.585-0.585-1.537,0-2.122 c0.283-0.283,0.66-0.438,1.061-0.438s0.777,0.155,1.061,0.438l9.899,9.899c0.585,0.585,0.585,1.537,0,2.122 C63.727,63.294,63.351,63.449,62.95,63.449z"></path>
                                <path fill="#472b29"
                                      d="M53.05,51.05c0.267,0,0.518,0.104,0.707,0.293l9.9,9.899c0.189,0.189,0.293,0.44,0.293,0.707 s-0.104,0.518-0.293,0.707c-0.189,0.189-0.44,0.293-0.707,0.293s-0.518-0.104-0.707-0.293l-9.9-9.899 c-0.189-0.189-0.293-0.44-0.293-0.707s0.104-0.518,0.293-0.707C52.532,51.154,52.783,51.05,53.05,51.05 M53.05,50.05 c-0.512,0-1.024,0.195-1.414,0.586c-0.781,0.781-0.781,2.047,0,2.828l9.899,9.899c0.391,0.391,0.902,0.586,1.414,0.586 s1.024-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828l-9.899-9.899C54.074,50.246,53.562,50.05,53.05,50.05L53.05,50.05z"></path>
                            </g>
                            <g>
                                <path fill="#fde751"
                                      d="M47 35.5A10.5 10.5 0 1 0 47 56.5A10.5 10.5 0 1 0 47 35.5Z"></path>
                                <path fill="#472b29"
                                      d="M47,36c5.514,0,10,4.486,10,10s-4.486,10-10,10s-10-4.486-10-10S41.486,36,47,36 M47,35 c-6.075,0-11,4.925-11,11s4.925,11,11,11s11-4.925,11-11S53.075,35,47,35L47,35z"></path>
                            </g>
                            <g>
                                <path fill="#88cdd7" d="M47 38.5A7.5 7.5 0 1 0 47 53.5A7.5 7.5 0 1 0 47 38.5Z"></path>
                                <path fill="#472b29"
                                      d="M47,39c3.86,0,7,3.14,7,7s-3.14,7-7,7s-7-3.14-7-7S43.14,39,47,39 M47,38c-4.418,0-8,3.582-8,8 s3.582,8,8,8s8-3.582,8-8S51.418,38,47,38L47,38z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M41.5,46.75c-0.138,0-0.25-0.112-0.25-0.25c0-1.732,0.729-3.401,1.999-4.581 c0.101-0.093,0.258-0.089,0.353,0.014c0.094,0.101,0.088,0.259-0.013,0.354c-1.168,1.084-1.838,2.62-1.838,4.214 C41.75,46.638,41.638,46.75,41.5,46.75z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M44.766,41.407c-0.091,0-0.178-0.05-0.223-0.136c-0.063-0.123-0.014-0.273,0.109-0.337 c0.887-0.454,1.845-0.685,2.848-0.685c0.138,0,0.25,0.112,0.25,0.25s-0.112,0.25-0.25,0.25c-0.923,0-1.804,0.212-2.62,0.63 C44.844,41.398,44.805,41.407,44.766,41.407z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M50.582,50.147c-0.067,0-0.134-0.026-0.183-0.08c-0.094-0.101-0.088-0.259,0.013-0.354 c1.168-1.084,1.838-2.62,1.838-4.214c0-0.138,0.112-0.25,0.25-0.25s0.25,0.112,0.25,0.25c0,1.732-0.729,3.401-1.999,4.581 C50.704,50.125,50.643,50.147,50.582,50.147z"></path>
                            </g>
                            <g>
                                <path fill="#472b29"
                                      d="M46.5,51.75c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25c0.923,0,1.804-0.212,2.62-0.63 c0.122-0.06,0.273-0.014,0.336,0.108c0.063,0.123,0.014,0.273-0.109,0.337C48.461,51.52,47.502,51.75,46.5,51.75z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <hr/>
            <div className="flex flex-col items-center justify-center gap-10 my-16">
                <h1 className={"text-3xl font-bold text-center"}>Where Skills meet Opportunity</h1>
                <h2 className={"text-1xl font-bold text-center"}>Your gateway to project success—start, bid, and achieve
                    your goals here.</h2>
                <div className="flex items-center justify-center w-full gap-10">
                    <Button className={"w-1/6 p-8 bg-black text-white text-xl"} color={"primary"} variant={"solid"}>Find
                        Your Next Hire</Button>
                    <Button
                        className={"w-1/6 p-8 bg-transparent border-2 hover:bg-black hover:text-white text-black text-xl"}>Find
                        Your Next Job</Button>
                </div>
            </div>
        </section>
    );
};
