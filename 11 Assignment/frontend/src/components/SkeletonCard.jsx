

const SkeletonCard = () => {
    return (
        <div className="p-6 rounded-2xl 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      shadow-lg animate-pulse">

            <div className="h-4 bg-white/30 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-white/30 rounded w-1/3"></div>

        </div>
    );
};

export default SkeletonCard;