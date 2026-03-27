import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import cardData from "../data/CardData";
import CardPage from "../pages/CardPage";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setData(cardData);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            <Navbar />

            <div className="min-h-[calc(100vh-640px)] pt-24 p-6 
        bg-gradient-to-br from-blue-900 via-purple-900 to-black">

                <h1 className="text-3xl text-white font-bold mb-10">
                    Dashboard 🚀
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {loading
                        ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : data.map((item) => (
                            <Card key={item.id} title={item.title} value={item.value} />
                        ))
                    }

                </div>
            </div>
            <CardPage />
        </>
    );
};

export default Dashboard;