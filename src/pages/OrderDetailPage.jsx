import HeaderA from "../components/HeaderA";
import OrderProductTable from "../components/OrderProductTable";

export default function OrderDetailsPage() {
  
  const orderId = '#1234';
  const orderStatus = 'Entregado';
  const totalAmount = 'S/ 400.00';

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "sans-serif",
      }}
    >
      
      <HeaderA />

      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "24px",
          }}
        >
          Detalles de Órden
        </h1>

        
        <div
          style={{
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            borderTop: "2px solid #e5e7eb",
          }}
        >
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "16px",
              marginBottom: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#111827",
              }}
            >
              Orden{" "}
              <span
                style={{
                  color: "#16a34a",
                }}
              >
                {orderId}
              </span>
            </h2>

            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontWeight: "600" }}>Estado:</span>{" "}
                <span
                  style={{
                    color: "#16a34a",
                    fontWeight: "700",
                  }}
                >
                  {orderStatus}
                </span>
              </p>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginRight: "4px",
                  }}
                >
                  Monto total:
                </span>
                {totalAmount}
              </p>
            </div>
          </div>

          
          <OrderProductTable />
        </div>
      </main>
    </div>
  );
}