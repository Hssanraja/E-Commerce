import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { addDoc, collection, deleteDoc, doc,getDocs , onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { fireDB } from '../../firebase/FirebaseConfig';


function MyState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    };

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const addProduct = async () => {
        if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description) {
            return toast.error("All fields are required");
        }

        setLoading(true);

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Product added successfully!", { duration: 2000 });
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2500); 

            getProductData();
        } catch (error) {
            console.error(error);
            toast.error("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    const [product, setProduct] = useState([]);

    const getProductData = async () => {
        setLoading(true);

        try {
            const q = query(collection(fireDB, 'products'), orderBy('time'));
            const data = onSnapshot(q, (querySnapshot) => {
                let productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false);
            });

            return () => data;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {getProductData();}, []);
    // updateProductfuction

    const editHandle = (item)=>{
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product Updated Successfully")
            getProductData()
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            setLoading(false);
        }catch (error) {
            console.log(error)
            setLoading(false);
        }
        
    }

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success("Product Deleted Successfully")
            getProductData()
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    
    const [order, setOrder] = useState([]);
    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

const [user, setUser] = useState([]);

const getUserData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB, "user"))
    const usersArray = [];
    result.forEach((doc) => {
      usersArray.push(doc.data());
      setLoading(false)
    });
    setUser(usersArray);
    console.log(usersArray)
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

  useEffect(() => {
    getProductData();
    getOrderData()
    getUserData()

  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
    
    return (
        <>
            {/* ✅ Ensure Toaster is included */}
            <Toaster position="top-center" reverseOrder={false} />
            <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, products, 
                setProducts, addProduct, product, editHandle, updateProduct, deleteProduct, order, user, 
                searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice }}>
                {props.children}
            </MyContext.Provider>
        </>
    );
}

export default MyState; 