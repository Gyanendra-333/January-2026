import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <div className="text-2xl font-bold tracking-wide">
                    BIT<span className="text-red-500">MAX</span>
                </div>

                <ul className="hidden md:flex items-center space-x-8 font-medium">
                    <li className="hover:text-blue-400 cursor-pointer">HOME</li>
                    <li className="hover:text-blue-400 cursor-pointer">ABOUT US</li>

                    <li className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                        SERVICES <FaChevronDown size={12} />
                    </li>

                    <li className="hover:text-blue-400 cursor-pointer">PORTFOLIO</li>
                    <li className="hover:text-blue-400 cursor-pointer">CONTACT</li>
                </ul>

                <button className="hidden md:block bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 text-white cursor-pointer">
                    <Link to="/login"> LOGIN </Link>
                </button>

                <div className="md:hidden text-xl">
                    {menuOpen ? (
                        <FaTimes onClick={() => setMenuOpen(false)} />
                    ) : (
                        <FaBars onClick={() => setMenuOpen(true)} />
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-black/80 px-6 pb-4">
                    <ul className="flex flex-col space-y-4">
                        <li>HOME</li>
                        <li>ABOUT US</li>
                        <li>SERVICES</li>
                        <li>PORTFOLIO</li>
                        <li>CONTACT</li>
                        <button className="bg-blue-600 px-4 py-2 rounded-full w-fit">
                            LOGIN
                        </button>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;