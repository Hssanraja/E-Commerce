import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(fireDB, "orders"));
        let ordersArray = [];
        querySnapshot.forEach((doc) => {
          ordersArray.push({ id: doc.id, ...doc.data() });
        });

        // Admin check (Replace with actual admin emails)
        const adminEmails = ["m.hssanraja@gmail.com", "m.hssanraja@gmail.com"];
        const isAdmin = adminEmails.includes(user?.email);

        // Filter orders for normal users
        const userOrders = isAdmin ? ordersArray : ordersArray.filter(order => order.email === user?.email);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Layout>
      {loading && <Loader />}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{user?.email === "admin@example.com" ? "All Orders" : "My Orders"}</h2>

        {orders.length > 0 ? (
          <div className="h-full pt-10">
            {orders.map((order) => (
              <div key={order.id} className="mb-6 p-4 bg-white shadow-lg rounded-lg">
                <h3 className="text-lg font-bold text-gray-900">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-700">Total Amount: PKR {order.totalAmount}</p>
                <p className={`text-sm font-medium ${order.paymentStatus === "pending" ? "text-red-500" : "text-green-500"}`}>
                  Payment Status: {order.paymentStatus}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {order.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img src={item.imageUrl} alt="product" className="w-20 h-20 object-cover rounded-lg" />
                      <div>
                        <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">Price: PKR {item.price}</p>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-2xl text-gray-700">No Orders Found</h2>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
