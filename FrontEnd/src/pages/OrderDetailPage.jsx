import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderProductTable from "../components/OrderProductTable";
import { useAuth } from '../context/AuthContext';
import { fetchOrderById } from '../services/orderService'; 

export default function OrderDetailsPage() {
  const { id } = useParams(); 
  const { getAuthHeader } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
        setIsLoading(true);
        try {

            const data = await fetchOrderById(id, getAuthHeader());
            setOrder(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    if(id) loadOrder();
  }, [id, getAuthHeader]);

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando detalles...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  if (!order) return null;

  // Formatear datos del backend
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const orderStatus = order.isDelivered ? 'Entregado' : (order.isPaid ? 'Pagado' : 'Pendiente');
  const statusColor = order.isPaid ? '#16a34a' : '#d97706'; 

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", fontFamily: "sans-serif" }}>
      <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "32px 16px" }}>
        
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", marginBottom: "24px" }}>
          Detalles de Órden
        </h1>

        <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", borderTop: "2px solid #e5e7eb" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#111827" }}>
              {/* CORRECCIÓN: Convertir a String antes de cortar */}
              Orden <span style={{ color: "#16a34a" }}>#{String(order._id || order.id).slice(-6).toUpperCase()}</span>
            </h2>

            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "4px" }}>
                <span style={{ fontWeight: "600" }}>Fecha:</span> {orderDate}
              </p>
              <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "4px" }}>
                <span style={{ fontWeight: "600" }}>Estado:</span>{" "}
                <span style={{ color: statusColor, fontWeight: "700" }}>{orderStatus}</span>
              </p>
              <p style={{ fontSize: "20px", fontWeight: "700", color: "#111827", marginTop: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#6b7280", marginRight: "4px" }}>
                  Monto total:
                </span>
                S/ {order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>


          <OrderProductTable items={order.orderItems} />
          
        </div>
      </main>
    </div>
  );
}
