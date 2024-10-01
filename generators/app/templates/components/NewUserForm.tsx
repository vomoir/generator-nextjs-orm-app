"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addUserAction } from "../app/api";

const NewUserForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    async function handleformSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            if (formData.get("password") === formData.get("passwordConfirm")) {
                const response = await addUserAction(formData);
                router.push('/home');
                setSuccess(`User added ${formData.get("email")}...`)
            } else {
                setError("Passwords don't match...")
            }

        } catch (err) {
            console.error(err);
            setError(err);
        }
    }
    return (
        <>
            <div className="text-xl text-red-500">{error}</div>
            <form className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md" onSubmit={handleformSubmit}>
                <div className="my-2">
                    <label htmlFor="firstName">First Name</label>
                    <input className="border mx-2 border-gray-500 rounded" type="text" name="firstName" id="firstName" />
                </div>
                <div className="my-2">
                    <label htmlFor="lastName">LastName</label>
                    <input className="border mx-2 border-gray-500 rounded" type="text" name="lastName" id="lastName" />
                </div>

                <div className="my-2">
                    <label htmlFor="email">Email address</label>
                    <input className="border mx-2 border-gray-500 rounded" type="email" name="email" id="email" />
                </div>
                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input className="border mx-2 border-gray-500 rounded" type="password" name="password" id="password" />
                </div>
                <div className="my-2">
                    <label htmlFor="passwordConfirm">Password</label>
                    <input className="border mx-2 border-gray-500 rounded" type="password" name="passwordConfirm" id="passwordConfirm" />
                </div>
                <div className="text-xl text-freen-500">{success}</div>
                <button type="submit" className="bg-blue-300 mt-4 rounded flex justify-center items-center w-36">Add user</button>
            </form>
        </>
    )
}

export default NewUserForm;