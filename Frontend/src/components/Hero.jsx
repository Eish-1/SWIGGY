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
        <section className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 py-24 md:py-32 text-white w-full overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white opacity-10 rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            </div>

            {/* Background Food Images */}
            <div className="absolute bottom-0 left-0 w-[30%] h-[90%] opacity-20 md:opacity-30 hidden md:block">
                <img
                    src="/Home/Sushi_replace_1.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center rounded-tr-3xl"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-500 pointer-events-none"></div>
            </div>

            <div className="absolute bottom-0 right-0 w-[30%] h-[90%] opacity-20 md:opacity-30 hidden md:block">
                <img
                    src="/Home/Veggies_new_1.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center rounded-tl-3xl"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary-500 pointer-events-none"></div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading leading-tight animate-fade-in">
                        Hungry? <span className="text-accent-dark bg-white bg-opacity-10 px-2 rounded-lg">Get it delivered.</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-12 font-sans opacity-90 max-w-3xl mx-auto">
                        Order food from the best restaurants and get it delivered right to your doorstep.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-2 md:p-3">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                            <div className="relative flex-1">
                                <label htmlFor="location-input" className="sr-only">Enter your delivery location</label>
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
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
                                </div>
                                <input
                                    id="location-input"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter your delivery location"
                                    className="w-full pl-12 pr-4 py-4 rounded-lg text-accent focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all duration-300"
                                    aria-label="Delivery location"
                                />
                            </div>
                            <div className="relative flex-1">
                                <label htmlFor="search-input" className="sr-only">Search for restaurant or food item</label>
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
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
                                </div>
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for restaurant or food item"
                                    className="w-full pl-12 pr-4 py-4 rounded-lg text-accent focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 transition-all duration-300"
                                    aria-label="Search for food or restaurant"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-accent text-white px-6 py-4 rounded-lg hover:bg-accent-light transition-colors duration-300 font-medium shadow-button flex-shrink-0 transform hover:scale-105 transition-transform"
                                aria-label="Find Food"
                            >
                                Find Food
                            </button>
                        </div>
                    </form>

                    {/* Food Categories Quick Access */}
                    <div className="mt-12 pt-6 hidden md:block">
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Pizza', 'Burger', 'Chinese', 'Biryani', 'South Indian', 'Desserts'].map((category) => (
                                <button
                                    key={category}
                                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-5 py-2 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 