// import Link from "next/link"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export default function Aform() {
  const schema = z.object({
    firstName: z.string().min(2).max(30, { message: "First name cannot be shorter than 2 characters" }),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    age: z.number().min(3).max(34),
    password : z.string().min(5).max(20),
    confirmPassword : z.string().min(5).max(20),
  }).refine(data => data.password === data.confirmPassword, {
    message : "Passwords do nor match",
    path : ["confirmPassword"],
  })
  
  
  const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(schema),
    //   defaultValues: {
    //     username: "",
  //   },
  })
  
  function onSubmit(values) {
    console.log(values)
  }
    
  return (
    <div className="app">
      <form className=" flex flex-col gap-5 w-80 justify-center m-auto border-cyan-700 border-4 rounded-xl p-5 bg-teal-100 " onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="">First name</label>
        <input type="text" {...register("firstName")} />
        { errors.firstName && <span className=" text-red-700" > { errors.firstName.message } </span> }
        <label htmlFor="">Last name</label>
        <input type="text" {...register("lastName")} />
        <label htmlFor="">Email</label>
        <input type="email" {...register("email")} />
        <label htmlFor="">Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        <label htmlFor="">Password</label>
        <input type="password" {...register("password")} />
        <label htmlFor="">confirm passowrd</label>
        <input type="text" {...register("confirmPassword")} />

        <input type="submit"  />
      </form>
    </div>
  )
}
