import { FaUsers } from "react-icons/fa";

const Card = ({ title, value }) => {
    return (
        <div className="p-6 rounded-2xl 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      hover:scale-105 transition duration-300">

            <div className="flex justify-between items-center">
                <h2 className="text-white text-sm">{title}</h2>
                <FaUsers className="text-white opacity-70" />
            </div>

            <p className="text-3xl font-bold text-white mt-4">{value}</p>
        </div>
    );
};

export default Card;