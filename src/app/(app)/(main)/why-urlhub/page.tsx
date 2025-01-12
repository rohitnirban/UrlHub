import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const WhyUrlHub = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <section className="text-gray-600 body-font">
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Shorten and Track Your Urls Easily</h1>
                        <p className="mb-6 text-base lg:text-lg">
                            UrlHub allows you to transform long, complex URLs into short, user-friendly urls in a matter of seconds. Additionally, you can track every click on your shortened urls, providing you with detailed insights into url performance. Whether you&apos;re sharing urls on social media, via email, or in presentations, shorter URLs help improve clarity and ensure smoother sharing experiences. With just a few clicks, you&apos;ll have a memorable url that&apos;s ready for distribution across all your channels.
                        </p>
                        <Link href="/register">
                            <button className="w-full md:w-auto text-white bg-black hover:bg-blue-700 focus:ring-blue-300 font-medium rounded-full text-base py-3 px-6 text-center transition duration-300">
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img className="w-full h-auto object-cover object-center rounded" alt="Shorten and track your urls" src='/why1.svg' />
                    </div>
                    
                </div>
            </section>

            <section className="text-gray-600 body-font mt-16 md:mt-24">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full md:w-1/2">
                        <img className="w-full h-auto object-cover object-center rounded" alt="URL Expiry" src='/why2.svg' />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">URL Expiry</h1>
                        <p className="mb-6 text-base lg:text-lg">
                            UrlHub allows you to set expiry dates for your shortened URLs. This feature ensures that your urls are only accessible for a specified period, providing an additional layer of control and security. Whether you&apos;re running time-sensitive promotions or sharing temporary content, URL expiry helps you manage the lifespan of your urls effectively.
                        </p>
                        <Link href="/features">
                            <button className="w-full md:w-auto text-white bg-black hover:bg-blue-700 focus:ring-blue-300 font-medium rounded-full text-base py-3 px-6 text-center transition duration-300">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font mt-16 md:mt-24">
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Password Protected URLs</h1>
                        <p className="mb-6 text-base lg:text-lg">
                            With UrlHub, you can add password protection to your shortened URLs. This feature ensures that only users with the correct password can access your urls, providing an extra layer of security for sensitive information. Whether you&apos;re sharing confidential documents or private content, password-protected URLs help you maintain control over who can view your urls.
                        </p>
                        <Link href="/dashboard">
                            <button className="w-full md:w-auto text-white bg-black hover:bg-blue-700 focus:ring-blue-300 font-medium rounded-full text-base py-3 px-6 text-center transition duration-300">
                                View Dashboard
                            </button>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img className="w-full h-auto object-cover object-center rounded" alt="Password Protected URLs" src='/why3.svg' />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WhyUrlHub
