import React, { useContext } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import myContext from '../../../context/data/myContext'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa'
import { AiFillShopping } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function DashboardTab() {
    const context = useContext(myContext)
    const { mode, product, editHandle, deleteProduct, order, user } = context

    const add = () => {
        window.location.href = '/addproduct'
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="tab container mx-auto">
                    <Tabs defaultIndex={0}>
                        <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-pink-700 border-pink-600 text-pink-600 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-600 bg-[#605d5d12] text-pink-600 hover:shadow-pink-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Orders
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-600 bg-[#605d5d12] text-pink-600 rounded-lg text-xl hover:shadow-pink-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        {/* Products Tab Panel */}
                        <TabPanel>
                            <div className="px-4 md:px-0 mb-16 ml-4 mr-4">
                                <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    Product Details
                                </h1>
                                <div className="flex justify-end">
                                    <button
                                        onClick={add}
                                        type="button"
                                        className="focus:outline-none text-white bg-yellow-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-yellow-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                    >
                                        <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                                            style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                        >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">S.No</th>
                                                <th scope="col" className="px-6 py-3">Image</th>
                                                <th scope="col" className="px-6 py-3">Title</th>
                                                <th scope="col" className="px-6 py-3">Price</th>
                                                <th scope="col" className="px-6 py-3">Category</th>
                                                <th scope="col" className="px-6 py-3">Date</th>
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.map((item, index) => (
                                                <tr key={index} className="bg-gray-50 border-b dark:border-gray-700"
                                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}
                                                >
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <img className="w-16" src={item.imageUrl} alt="product" />
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {item.title}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        ₹{item.price}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {item.category}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {item.date}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => deleteProduct(item)} className="text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                            <Link to={'/updateproduct'}>
                                                                <button onClick={() => editHandle(item)} className="text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="relative overflow-x-auto mb-16 ml-4 mr-4">
                                <h1
                                    className="text-center mb-5 text-3xl font-semibold underline"
                                    style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                    Order Details
                                </h1>
                                {order && order.length > 0 ? (
                                    order.map((orderItem, index) => (
                                        <div key={index} className="mb-6">
                                            <h2
                                                className="text-xl font-semibold mb-3 text-pink-600"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                Order # {index + 1}
                                            </h2>
                                            <table className="w-full text-sm text-left text-black mb-3">
                                                <thead
                                                    className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                                                    style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : ''
                                                    }}
                                                >
                                                    <tr>
                                                        <th className="px-6 py-3">Name</th>
                                                        <th className="px-6 py-3">Address</th>
                                                        <th className="px-6 py-3">Pincode</th>
                                                        <th className="px-6 py-3">Phone Number</th>
                                                        <th className="px-6 py-3">Payment Status</th>
                                                        <th className="px-6 py-3">Total Amount</th>
                                                        <th className="px-6 py-3">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        className="bg-gray-50 border-b dark:border-gray-700"
                                                        style={{
                                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                            color: mode === 'dark' ? 'white' : ''
                                                        }}
                                                    >
                                                        <td className="px-6 py-4">{orderItem.name}</td>
                                                        <td className="px-6 py-4">{orderItem.address}</td>
                                                        <td className="px-6 py-4">{orderItem.pincode}</td>
                                                        <td className="px-6 py-4">{orderItem.phoneNumber}</td>
                                                        <td className="px-6 py-4">{orderItem.paymentStatus}</td>
                                                        <td className="px-6 py-4">₹{orderItem.totalAmount}</td>
                                                        <td className="px-6 py-4">
                                                            {orderItem.createdAt && orderItem.createdAt.seconds
                                                                ? new Date(orderItem.createdAt.seconds * 1000).toLocaleString()
                                                                : "N/A"}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {/* Nested Cart Items Table */}
                                            {orderItem.cartItems && orderItem.cartItems.length > 0 && (
                                                <div>
                                                    <table className="w-full text-sm text-left text-black">
                                                        <thead
                                                            className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                                                            style={{
                                                                backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                                color: mode === 'dark' ? 'white' : ''
                                                            }}
                                                        >
                                                            <tr>
                                                                <th className="px-4 py-2">Image</th>
                                                                <th className="px-4 py-2">Title</th>
                                                                <th className="px-4 py-2">Category</th>
                                                                <th className="px-4 py-2">Price</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orderItem.cartItems.map((item, itemIndex) => (
                                                                <tr
                                                                    key={itemIndex}
                                                                    className="bg-gray-50 border-b dark:border-gray-700"
                                                                    style={{
                                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                                        color: mode === 'dark' ? 'white' : ''
                                                                    }}
                                                                >
                                                                    <td className="px-4 py-2">
                                                                        <img
                                                                            className="w-16"
                                                                            src={item.imageUrl}
                                                                            alt={item.title}
                                                                        />
                                                                    </td>
                                                                    <td className="px-4 py-2">{item.title}</td>
                                                                    <td className="px-4 py-2">{item.category}</td>
                                                                    <td className="px-4 py-2">₹{item.price}</td>
                                                                  
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">No orders found</p>
                                )}
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10 mr-4 ml-4">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                User Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    {user.map((item, index) => {
                                        const { name, uid, email, date } = item;
                                        return (
                                            <tbody>
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}.
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {name}
                                                    </td>

                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {uid}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {email}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {date}
                                                    </td>

                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </>
    )
}


export default DashboardTab