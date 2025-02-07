import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Navbar from '../components/ui/Navbar';

const AuthPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 🔹 Function to handle form submission
  const onSubmit = async (data, type) => {
    setErrorMessage('');
    setSuccessMessage('');

    const BASE_URL = "http://localhost:5000/api"; // Backend URL
    const endpoint = type === 'signup' ? `${BASE_URL}/signup` : `${BASE_URL}/login`;

    console.log("Submitting form:", data);
    console.log("Using endpoint:", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSuccessMessage(result.message || `${type === 'signup' ? 'Signup' : 'Login'} successful!`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center h-screen'>
        <Tabs defaultValue="signup" className="md:w-[25vw] md:h-[40vh] w-[90vw]">
          <TabsList>
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          {/* 🔹 Signup Form (Explicitly passing 'signup' type) */}
          <TabsContent value="signup">
            <form onSubmit={handleSubmit((data) => onSubmit(data, 'signup'))} className='flex flex-col gap-5'>
              <h1 className='text-l m-2 font-poppins'>New here? Create a new account!</h1>
              <Input type='text' placeholder='Email' {...register('email', { required: true })} className="text-sm md:h-[5vh]" />
              {errors.email && <span className="text-red-500">Email is required</span>}
              <Input type='password' placeholder='Password' {...register('password', { required: true })} className="text-sm md:h-[5vh]" />
              {errors.password && <span className="text-red-500">Password is required</span>}
              <Input type='text' placeholder='Name' {...register('name', { required: true })} className="text-sm md:h-[5vh]" />
              {errors.name && <span className="text-red-500">Name is required</span>}
              <Button type="submit" disabled={isSubmitting} variant="secondary" className="bg-rose-600 text-sm md:text-xl md:h-[5vh]">
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </TabsContent>

          {/* 🔹 Login Form (Explicitly passing 'login' type) */}
          <TabsContent value="login">
            <form onSubmit={handleSubmit((data) => onSubmit(data, 'login'))} className='flex flex-col gap-5'>
              <h1 className='text-l m-2'>Already have an account? Login!</h1>
              <Input type='text' placeholder='Email' {...register('email', { required: true })} className="text-sm md:h-[5vh]" />
              {errors.email && <span className="text-red-500">Email is required</span>}
              <Input type='password' placeholder='Password' {...register('password', { required: true })} className="text-sm md:h-[5vh]" />
              {errors.password && <span className="text-red-500">Password is required</span>}
              <Button type="submit" disabled={isSubmitting} variant="secondary" className="bg-rose-600 text-sm md:text-xl md:h-[5vh]">
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </form>
          </TabsContent>

        </Tabs>
      </div>

      {/* 🔹 Display success or error messages */}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
    </div>
  );
};

export default AuthPage;
