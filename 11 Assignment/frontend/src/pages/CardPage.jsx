import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ImageCard from "../components/ImageCard";
import SkeletonImageCard from "../components/SkeletonImageCard";
import cardPageData from "../data/cardPageData";

const CardPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(cardPageData);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            <Navbar />

            <div className="min-h-screen pt-24 p-6 
        bg-gradient-to-br from-blue-900 via-purple-900 to-black">

                <h1 className="text-3xl text-white font-bold mb-10 text-center">
                    Our Services 🚀
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                    {loading
                        ? Array(6)
                            .fill(0)
                            .map((_, i) => <SkeletonImageCard key={i} />)
                        : data.map((item) => (
                            <ImageCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        ))
                    }

                </div>
            </div>
        </>
    );
};

export default CardPage;