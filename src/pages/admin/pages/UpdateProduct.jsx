import React, { useContext, useEffect } from 'react'
import myContext from '../../../context/data/myContext'

function UpdateProduct({ id }) { 
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;  

    
    useEffect(() => {
      
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(id);  // Pass the id to your update function
    };

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text"
                                value={products.title || ''}  // Add fallback empty string
                                onChange={(e) => setProducts({ ...products, title: e.target.value })}
                                name='title'
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product title'
                                required
                            />
                        </div>
                        <div>
                            <input type="number"  // Changed to number type for price
                                value={products.price || ''}
                                onChange={(e) => setProducts({ ...products, price: e.target.value })}
                                name='price'
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product price'
                                required
                            />
                        </div>
                        <div>
                            <input type="url"  // Changed to URL type for imageUrl
                                value={products.imageUrl || ''}
                                onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                                name='imageurl'
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product imageUrl'
                                required
                            />
                        </div>
                        <div>
                            <input type="text"
                                value={products.category || ''}
                                onChange={(e) => setProducts({ ...products, category: e.target.value })}
                                name='category'
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product category'
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                cols="30"
                                rows="10"
                                name='description'
                                value={products.description || ''}
                                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                                placeholder='Product description'
                                required
                            >
                            </textarea>
                        </div>
                        <div className='flex justify-center mb-3'>
                            <button
                                type="submit"
                                className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
                            >
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct