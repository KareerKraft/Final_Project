import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Loader2 } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        companyName: "",
        file: null
    });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, companyName: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, file });
    };

    const registerNewCompany = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("companyName", input.companyName);

            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success("Company created");
                setLoading(false);
                navigate("/admin/companies", { replace: true });
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create company");
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    value={input.companyName}
                    onChange={changeEventHandler}
                />
                <Label>Company Logo</Label>
                <Input
                    type="file"
                    accept="image/*"
                    className="my-2"
                    onChange={changeFileHandler}
                />

                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany} disabled={loading}>
                        {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</> : "Continue"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate