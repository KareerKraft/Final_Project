import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { GoogleLogin } from "@react-oauth/google";

const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

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
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={submitHandler} className="border p-6 rounded w-96 bg-white shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={input.email}
          onChange={changeHandler}
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          value={input.password}
          onChange={changeHandler}
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
        />

        <div className="flex gap-4 mb-4 justify-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="student"
              onChange={changeHandler}
            />
            Student
          </label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="recruiter"
              onChange={changeHandler}
            />
            Recruiter
          </label>
        </div>

        {loading ?
          <button disabled className="w-full bg-gray-500 text-white p-2 rounded">
            <Loader2 className="animate-spin inline mr-2" />
            Please wait
          </button>
          :
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        }

        <div className="mt-5 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Sign In Failed")}
          />
        </div>

      </form>
    </div>
  );
};

export default Login;