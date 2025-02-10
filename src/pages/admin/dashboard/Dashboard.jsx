import React, { useContext, useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

// Initialize Firestore
const app = getApp();
const db = getFirestore(app);

function Dashboard() {
    const context = useContext(myContext);
    const { mode } = context;

    // State for dynamic values
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                const usersSnapshot = await getDocs(collection(db, 'user'));

                setTotalProducts(productsSnapshot.size);
                setTotalOrders(ordersSnapshot.size);
                setTotalUsers(usersSnapshot.size);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    {/* Center-align all dashboard cards */}
                    <div className="flex flex-wrap justify-center items-center gap-6 text-center">

                        {/* Total Products */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{totalProducts}</h2>
                                <p className="text-yellow-600 font-bold">Total Products</p>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{totalOrders}</h2>
                                <p className="text-yellow-600 font-bold">Total Orders</p>
                            </div>
                        </div>

                        {/* Total Users */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-yellow-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-yellow-600 w-12 h-12 mb-3 inline-block">
                                    <FaUserTie size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{totalUsers}</h2>
                                <p className="text-yellow-600 font-bold">Total Users</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>

    );
}

export default Dashboard;
