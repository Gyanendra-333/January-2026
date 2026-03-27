

const ImageCard = ({ title, description, image }) => {
    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 
      rounded-2xl overflow-hidden shadow-lg 
      hover:scale-105 transition duration-300">

            {/* Image */}
            <div className="h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <h2 className="text-white text-lg font-semibold">{title}</h2>
                <p className="text-white/70 text-sm mt-2">{description}</p>
            </div>
        </div>
    );
};

export default ImageCard;