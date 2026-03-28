import React, { useState } from 'react';
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '@/redux/authSlice';
import { Loader2, Lock, Mail, Phone, User } from 'lucide-react';

const roleOptions = [
    { label: "Student", value: "student" },
    { label: "Recruiter", value: "recruiter" }
];

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            toast.error("All fields required");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <form onSubmit={submitHandler} className="w-full max-w-md rounded-[28px] bg-white px-8 py-10 shadow-xl">
                <h1 className="text-center text-5xl font-bold text-slate-900">Sign up</h1>
                <p className="mt-4 text-center text-xl text-slate-500">Please register to continue</p>

                <div className="mt-8 space-y-5">
                    <div className="flex items-center gap-3 rounded-full border border-slate-300 px-5 py-4">
                        <User className="h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Name"
                            className="w-full border-none bg-transparent text-lg text-slate-700 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-slate-300 px-5 py-4">
                        <Mail className="h-5 w-5 text-slate-400" />
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Email id"
                            className="w-full border-none bg-transparent text-lg text-slate-700 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-slate-300 px-5 py-4">
                        <Phone className="h-5 w-5 text-slate-400" />
                        <input
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Phone number"
                            className="w-full border-none bg-transparent text-lg text-slate-700 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-slate-300 px-5 py-4">
                        <Lock className="h-5 w-5 text-slate-400" />
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className="w-full border-none bg-transparent text-lg text-slate-700 outline-none"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <p className="mb-3 text-sm font-medium text-slate-600">Choose role</p>
                    <div className="grid grid-cols-2 gap-3">
                        {roleOptions.map((role) => (
                            <label
                                key={role.value}
                                className={`cursor-pointer rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition ${
                                    input.role === role.value
                                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                                        : "border-slate-300 text-slate-600"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={role.value}
                                    checked={input.role === role.value}
                                    onChange={changeEventHandler}
                                    className="sr-only"
                                />
                                {role.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-slate-600">Profile photo</label>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={changeFileHandler}
                        className="block w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:font-medium file:text-emerald-600"
                    />
                </div>

                {loading ? <button
                    disabled
                    className="mt-7 flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-4 text-lg font-semibold text-white"
                >
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Please wait
                </button> : <button
                    type="submit"
                    className="mt-7 w-full rounded-full bg-emerald-500 px-5 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
                >
                    Sign up
                </button>
                }

                <p className="mt-6 text-center text-lg text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className='font-medium text-emerald-500 hover:text-emerald-600'>
                        click here
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
