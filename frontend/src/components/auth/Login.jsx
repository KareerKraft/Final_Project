import React, { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from '@/redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Lock, Mail } from 'lucide-react';
import { GoogleLogin } from "@react-oauth/google";

const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

const roleOptions = [
  { label: "Student", value: "student" },
  { label: "Recruiter", value: "recruiter" }
];

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error("All fields required");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!input.role) {
        toast.error("Please select role first");
        return;
      }

      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/google`,
        {
          token: credentialResponse.credential,
          role: input.role
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={submitHandler} className="w-full max-w-md rounded-[28px] bg-white px-8 py-10 shadow-xl">
        <h1 className="text-center text-5xl font-bold text-slate-900">Login</h1>
        <p className="mt-4 text-center text-xl text-slate-500">Please login to continue</p>

        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3 rounded-full border border-slate-300 px-5 py-4">
            <Mail className="h-5 w-5 text-slate-400" />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              placeholder="Email id"
              className="w-full border-none bg-transparent text-lg text-slate-700 outline-none"
            />
          </div>

          <div className="flex items-center gap-3 rounded-full border border-slate-300 px-5 py-4">
            <Lock className="h-5 w-5 text-slate-400" />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
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
                  onChange={changeHandler}
                  className="sr-only"
                />
                {role.label}
              </label>
            ))}
          </div>
        </div>

        {loading ? (
          <button
            disabled
            className="mt-7 flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-4 text-lg font-semibold text-white"
          >
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Please wait
          </button>
        ) : (
          <button
            type="submit"
            className="mt-7 w-full rounded-full bg-emerald-500 px-5 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
          >
            Login
          </button>
        )}

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Sign In Failed")}
          />
        </div>

        <p className="mt-6 text-center text-lg text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium text-emerald-500 hover:text-emerald-600">
            click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
