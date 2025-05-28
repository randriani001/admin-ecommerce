import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react'
import React from 'react'

export default function LoginPage() {
    const {data, setData, post, errors, processing} = useForm({
        email: '',
        password: '',
        // price: 0 -> jangan string
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login');
    }

  return (
    <div className='p-50 place-items-center content-center'>
        <h1 className='mb-5 font-bold text-2xl'>Login to your account</h1>

        <form onSubmit={handleSubmit} className='mb-4'>
            <div className='flex-row align-items-center justify-content-center justify-content-lg-start'>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email </label>
                <input 
                    onChange={e => setData('email', e.target.value)}
                    value={data.email} 
                    type="text" 
                    name="email" 
                    placeholder="email"
                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' />
                {errors.email && <p className='text-red-500'>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input 
                    onChange={e => setData('password', e.target.value)}
                    value={data.password} 
                    type="password" 
                    name="password" 
                    placeholder="password"
                    className='bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white' />
                {errors.password && <p className='text-red-500'>{errors.password}</p>}
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-start mt-1">
                    <input 
                        id="remember" 
                        type="checkbox" 
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    <label 
                        htmlFor="remember" 
                        className="text-gray-500 dark:text-gray-300 ml-1 text-sm mb-3">Remember me</label>
                    <a href="" 
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-5">Forgot password?</a>
                </div>
            </div>
            <Button disabled={processing} type='submit' className='hover:text-white'>Login</Button>
        </form>
    </div>
  )
}
