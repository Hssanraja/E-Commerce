import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/loader/Loader';

function Signup() {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [userSignUp, setUserSignUp] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const userSignUpFunction = async () => {
        if (userSignUp.name === '' || userSignUp.email === '' || userSignUp.password === '') {
            return toast.error('All fields are required');
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignUp.email, userSignUp.password);

            const user = {
                name: userSignUp.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignUp.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                }),
            };

            const userReference = collection(fireDB, 'user');
            await addDoc(userReference, user);

            setUserSignUp({
                name: '',
                email: '',
                password: '',
                role: 'user',
            });

            toast.success('Signup Successfully');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    }}
                />
                
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={userSignUp.name}
                            onChange={(e) => setUserSignUp({ ...userSignUp, name: e.target.value })}
                            name='name'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Name'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={userSignUp.email}
                            onChange={(e) => setUserSignUp({ ...userSignUp, email: e.target.value })}
                            name='email'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={userSignUp.password}
                            onChange={(e) => setUserSignUp({ ...userSignUp, password: e.target.value })}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={userSignUpFunction}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200'
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <Loader /> {/* Show the loader */}
                                </div>
                            ) : (
                                'Signup' // Show the "Signup" text when not loading
                            )}
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>
                            Already have an account? <Link className='text-yellow-500 font-bold' to={'/login'}>Login</Link>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
