import { useState } from 'react';

const Hero = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(location, searchTerm);
        }
    };

    return (
        <section className="relative bg-gradient-to-r from-[#FC8019] to-[#FFA726] py-32 text-white w-full overflow-hidden">
            {/* Background Images */}
            <div className="absolute bottom-0 left-0 w-[20%] h-[90%] opacity-30">
                <img
                    src="/Home/Sushi_replace_1.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FC8019] pointer-events-none"></div>
            </div>

            <div className="absolute bottom-0 right-0 w-[20%] h-[90%] opacity-30">
                <img
                    src="/Home/Veggies_new_1.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FFA726] pointer-events-none"></div>
            </div>

            <div className="container max-w-full mx-auto px-4 md:px-8 lg:px-12 text-center relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins',sans-serif] leading-tight">
                        Order food & Discover the best restaurants.
                    </h1>
                    <p className="text-2xl mb-12 font-['Inter',sans-serif]">Swiggy it!</p>

                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <label htmlFor="location-input" className="sr-only">Enter your delivery location</label>
                                <input
                                    id="location-input"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter your delivery location"
                                    className="w-full px-5 py-4 rounded-lg text-[#282C3F] focus:outline-none focus:ring-2 focus:ring-[#FC8019] shadow-md text-lg"
                                    aria-label="Delivery location"
                                />
                                <span className="absolute right-4 top-4 text-gray-400" aria-hidden="true">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="search-input" className="sr-only">Search for restaurant or food item</label>
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for restaurant or food item"
                                    className="w-full px-5 py-4 rounded-lg text-[#282C3F] focus:outline-none focus:ring-2 focus:ring-[#FC8019] shadow-md text-lg"
                                    aria-label="Search for food or restaurant"
                                />
                                <span className="absolute right-4 top-4 text-gray-400" aria-hidden="true">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#282C3F] text-white px-6 py-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 font-medium shadow-md text-lg"
                                aria-label="Find Food"
                            >
                                Find Food
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero; 