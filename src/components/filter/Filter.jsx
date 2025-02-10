import React, { useContext, useEffect } from 'react';
import myContext from '../../context/data/myContext';

function Filter() {
    const context = useContext(myContext);
    const { mode, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice, product, setProducts } = context;

    // Extract unique categories and prices
    const uniqueCategories = [...new Set(product.map(item => item.category.toLowerCase()))];
    const uniquePrices = [...new Set(product.map(item => item.price.toString()))];

    useEffect(() => {
        // Apply filters when state changes
        const filtered = product.filter(item => {
            return (
                (searchkey === "" || item.title.toLowerCase().includes(searchkey.toLowerCase())) &&
                (filterType === "" || item.category.toLowerCase() === filterType) &&
                (filterPrice === "" || item.price.toString() === filterPrice)
            );
        });
        setProducts(filtered); // Update displayed products
    }, [searchkey, filterType, filterPrice, product, setProducts]);

    return (
        <div className="container mx-auto px-4 mt-5">
            <div className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
                style={{
                    backgroundColor: mode === 'dark' ? '#282c34' : '',
                    color: mode === 'dark' ? 'white' : '',
                }}>
                <div className="relative">
                    <input
                        type="text"
                        value={searchkey}
                        onChange={(e) => setSearchkey(e.target.value)}
                        placeholder="Search here"
                        className="px-8 py-3 w-full rounded-md border-transparent outline-0 text-sm"
                        style={{
                            backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                            color: mode === 'dark' ? 'white' : '',
                        }}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="font-medium">Filters</p>
                    <button
                        onClick={() => {
                            setFilterType("");
                            setFilterPrice("");
                            setSearchkey("");
                        }}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                    >
                        Reset Filter
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-3 w-full rounded-md"
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                        className="px-4 py-3 w-full rounded-md"
                    >
                        <option value="">All Prices</option>
                        {uniquePrices.map((price, index) => (
                            <option key={index} value={price}>{price}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filter;
