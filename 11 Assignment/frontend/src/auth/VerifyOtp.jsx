import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const OtpVerify = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef([]);

    // 🔢 Handle input
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move next
        if (element.nextSibling) {
            element.nextSibling.focus();
        }

        // ✅ Auto submit when filled
        if (newOtp.every((digit) => digit !== "")) {
            handleVerify(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    // ✅ Verify OTP
    const handleVerify = async (otpValue) => {
        try {
            setLoading(true);

            const res = await API.post("/auth/verify-otp", {
                email,
                otp: otpValue,
            });

            toast.success(res.data.msg || "OTP Verified 🎉");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.msg || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleVerify(otp.join(""));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">

                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Verify OTP 🔐
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Enter the 6-digit code sent to your email
                </p>

                <form onSubmit={handleSubmit}>

                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2 mb-6">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                ref={(el) => (inputsRef.current[index] = el)}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center border rounded-lg text-xl focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                        ))}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                {/* Back */}
                <p className="text-sm text-gray-500 mt-4">
                    <Link to="/login" className="hover:underline">
                        Back to Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default OtpVerify;