import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const WhyUrlHub = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
            <section className="text-gray-600 body-font">
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Shorten Your Links Easily</h1>
                        <p className="mb-6 text-base lg:text-lg">
                            UrlHub allows you to transform long, complex URLs into short, user-friendly links in a matter of seconds. Whether you&apos;re sharing links on social media, via email, or in presentations, shorter URLs help improve clarity and ensure smoother sharing experiences. With just a few clicks, you&apos;ll have a memorable link that&apos;s ready for distribution across all your channels.
                        </p>
                        <Link href="/register">
                            <button className="w-full md:w-auto text-white bg-black hover:bg-blue-700 focus:ring-blue-300 font-medium rounded-full text-base py-3 px-6 text-center transition duration-300">
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image className="w-full h-auto object-cover object-center rounded" alt="Shorten your links" src='/why1.svg' />
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font mt-16 md:mt-24">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                    <div className="w-full md:w-1/2">
                        <Image className="w-full h-auto object-cover object-center rounded" alt="Track every click" src='/why2.svg' />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Track Every Click</h1>
                        <p className="mb-6 text-base lg:text-lg">
                            UrlHub offers real-time analytics for every shortened link, providing you with detailed insights into link performance. Know exactly how many times your link has been clicked, where those clicks are coming from, and what devices your audience is using. Our robust tracking capabilities ensure you stay informed and in control, helping you fine-tune your campaigns and maximize engagement.
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
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Comprehensive Click History</h1>
                        <p className="mb-6 text-base lg:text-lg">
                            Our platform provides a complete click history for every link, allowing you to go beyond surface-level analytics. With UrlHub, you can analyze trends over time, identify peak periods of activity, and gain deeper insights into user behavior. This comprehensive data empowers you to make more informed decisions about your content strategies and marketing efforts, ultimately boosting your reach and effectiveness.
                        </p>
                        <Link href="/dashboard">
                            <button className="w-full md:w-auto text-white bg-black hover:bg-blue-700 focus:ring-blue-300 font-medium rounded-full text-base py-3 px-6 text-center transition duration-300">
                                View Dashboard
                            </button>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image className="w-full h-auto object-cover object-center rounded" alt="Click History" src='/why3.svg' />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WhyUrlHub
