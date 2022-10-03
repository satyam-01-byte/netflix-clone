import Head from "next/head"
import Image from "next/image"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
    email: string,
    password: string
}

function login() {
    const [login, setLogin] = useState(true);
    const {signIn, signUp, loading} = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
        if(login) await signIn(email, password);
        else await signUp(email, password);
    }

  return (
    <div className="relative w-screen h-screen flex flex-col bg-black md:items-center md:justify-center md:bg-transparent">
        <Head>
            <title>Netflix</title>
            <link rel="icon" href="/favicon.jpeg" />
        </Head>
        <Image layout="fill" src="https://rb.gy/p2hphi"  objectFit="cover" className="-z-10 !hidden opacity-60 sm:!inline" />

        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" width={100} height={100} className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6" />

        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 rounded bg-black/75 space-y-8 py-10 px-6 md:max-w-md md:px-14">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Sign {login ? "In" : "Up"}</h1>
                {loading && <p className="w-7 h-7 animate-spin rounded-full border-4 border-gray-400 border-t-4 border-t-red-600"></p>}
             </div>
            <div className="space-y-4">
                <label className="inline-block w-full">
                    <input type="email" placeholder="Email" className="input" {...register("email", {required: true})} />
                    {/* errors will return when field validation fails  */}
                    {errors.email && <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email.</p>}
                </label>
                <label className="inline-block w-full">
                    <input type="password" placeholder="Password" className="input" {...register("password", {required: true})} />
                    {errors.password && <p className="p-1 text-[13px] font-light text-orange-500">Your password must contain between 4 and 60 characters.</p>}
                </label>
            </div>

            <button className="w-full rounded bg-[#e50914] py-3 font-semibold">Sign {login ? "In" : "Up"}</button>
            <div className="text-[gray]">
                {login ? "New to Netflix? " : "Already have an account? "}
                <a className="text-white hover:underline cursor-pointer" onClick={() => setLogin(!login)}>Sign {login ? "up" : "in"} now</a>
            </div>
        </form>
    </div>
  )
}

export default login