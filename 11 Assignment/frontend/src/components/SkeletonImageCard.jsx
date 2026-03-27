

const SkeletonImageCard = () => {
    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 
      rounded-2xl overflow-hidden shadow-lg animate-pulse">

            {/* Image Skeleton */}
            <div className="h-48 bg-white/20"></div>

            {/* Content Skeleton */}
            <div className="p-5 space-y-3">
                <div className="h-5 bg-white/30 rounded w-2/3"></div>
                <div className="h-4 bg-white/20 rounded w-full"></div>
                <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
        </div>
    );
};

export default SkeletonImageCard;