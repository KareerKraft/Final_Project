import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white flex-col">

      <h1 className="text-4xl mb-10 font-bold">
        Continue As
      </h1>

      <div className="flex gap-10">
        <button
          onClick={() => selectRole("student")}
          className="bg-green-600 px-8 py-4 rounded-xl text-xl"
        >
          Student
        </button>

        <button
          onClick={() => selectRole("recruiter")}
          className="bg-white text-black px-8 py-4 rounded-xl text-xl"
        >
          Recruiter
        </button>
      </div>

    </div>
  );
}