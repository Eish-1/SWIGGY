import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-accent text-white pt-16 pb-8">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                {/* Top section with newsletter */}
                <div className="mb-16 bg-accent-light bg-opacity-30 rounded-2xl p-6 md:p-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="max-w-md">
                            <h3 className="text-2xl font-bold mb-3 font-heading">Get the latest updates</h3>
                            <p className="text-gray-300 text-sm md:text-base">
                                Subscribe to our newsletter for exclusive offers, latest food trends and updates from your favorite restaurants.
                            </p>
                        </div>
                        <form className="w-full md:w-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
                                />
                                <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Main footer content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                    <div>
                        <div className="mb-6">
                            <img
                                src="/Home/Swiggy_logo_bml6he.png"
                                alt="Swiggy"
                                className="h-8 md:h-10"
                            />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Order food from your favorite restaurants with our easy-to-use platform. Discover the best food & beverages in your area.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-primary-500 transition-colors duration-300">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-primary-500 transition-colors duration-300">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-primary-500 transition-colors duration-300">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white font-heading">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white font-heading">For Restaurants</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/partner" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Partner With Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/apps" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Apps For You
                                </Link>
                            </li>
                            <li>
                                <Link to="/business" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Swiggy for Business
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white font-heading">Learn More</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/privacy" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/security" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Download apps section */}
                <div className="border-t border-gray-700 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a href="#" className="flex items-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 px-4 py-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.9 2.318A5.284 5.284 0 0 0 16.455 1a5.594 5.594 0 0 0-4.908 2.88L12 3.401l-.455-.48A5.599 5.599 0 0 0 6.637 1a5.276 5.276 0 0 0-1.445 1.318a5.177 5.177 0 0 0-1.1 3.255a5.11 5.11 0 0 0 1.428 3.242L12 15.601l6.47-6.786c.013-.014.026-.027.038-.04a5.11 5.11 0 0 0 1.43-3.242a5.178 5.178 0 0 0-1.038-3.215Z" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-400">Download on the</div>
                                <div className="font-medium">App Store</div>
                            </div>
                        </a>
                        <a href="#" className="flex items-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 px-4 py-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.523 7.89a2.084 2.084 0 0 0-.516.485l-8.13 14.323a.173.173 0 0 0 .227.242l8.4-4.43a2.08 2.08 0 0 0 .952-1.145l1.122-3.326A2.428 2.428 0 0 0 19.9 12c0-1.28-.665-2.4-1.67-3.043l-.707-1.067zm-1.285-.553l.855 1.291a.17.17 0 0 0 .057.057A3.619 3.619 0 0 1 19.9 12c0 .856-.298 1.64-.793 2.261a.18.18 0 0 0-.018.167l1.12 3.318a.173.173 0 0 1-.078.207L4.33 23.078a1.374 1.374 0 0 1-1.295-.059a1.35 1.35 0 0 1-.667-1.12V2.101c0-.492.261-.95.685-1.197a1.381 1.381 0 0 1 1.277-.047l11.908 6.48z" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-400">GET IT ON</div>
                                <div className="font-medium">Google Play</div>
                            </div>
                        </a>
                    </div>

                    <div className="text-center md:text-right text-gray-400 text-sm">
                        <p>© {new Date().getFullYear()} Swiggy. All rights reserved.</p>
                        <p className="mt-1">Made with <span className="text-primary-500">♥</span> in India</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 