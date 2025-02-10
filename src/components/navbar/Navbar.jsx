import React, { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

function Navbar() {
  const [open, setOpen] = useState(false);
  const context = useContext(myContext);
  const { mode, toggleMode } = context;

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.user?.email === 'm.hssanraja@gmail.com';

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const cartItems = useSelector((state) => state.Cart);

  return (
    <div className="bg-white sticky top-0 z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link to="/allproducts" className="text-sm font-medium text-gray-900">
                    All Products
                  </Link>

                  {/* Show "Order" only if user is NOT admin */}
                  {!isAdmin && user && (
                    <div className="flow-root">
                      <Link to="/order" className="-m-2 block p-2 font-medium text-gray-900">
                        Order
                      </Link>
                    </div>
                  )}

                  {/* Show "Admin" link only for admin users */}
                  {isAdmin && (
                    <div className="flow-root">
                      <Link to="/dashboard" className="-m-2 block p-2 font-medium text-gray-900">
                        Admin
                      </Link>
                    </div>
                  )}

                  {/* Logout Button */}
                  {user && (
                    <div className="flow-root">
                      <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                        Logout
                      </a>
                    </div>
                  )}

                  <div className="flow-root">
                    <Link to="/" className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                        alt="Dan_Abromov"
                      />
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Navbar */}
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-yellow-600 px-4 text-sm font-medium text-white">
          Get free delivery on orders over ₹300
        </p>

        <nav className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl">
          <div className="">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/" className="flex">
                  <h1 className="text-2xl font-bold text-black px-2 py-1 rounded">E-Commerce</h1>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to="/allproducts" className="text-sm font-medium text-gray-700">
                    All Products
                  </Link>

                  {/* Show "Order" only for normal users */}
                  {!isAdmin && user && (
                    <Link to="/order" className="text-sm font-medium text-gray-700">
                      Order
                    </Link>
                  )}

                  {/* Show "Admin" only for Admin Users */}
                  {isAdmin && (
                    <Link to="/dashboard" className="text-sm font-medium text-gray-700">
                      Admin
                    </Link>
                  )}

                  {/* Logout Button */}
                  {user && (
                    <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer">
                      Logout
                    </a>
                  )}
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex lg:ml-6">
                  <button className="" onClick={toggleMode}>
                    {mode === 'light' ? <FiSun size={30} /> : <BsFillCloudSunFill size={30} />}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <span className="ml-2 text-sm font-medium text-gray-700">{cartItems.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
