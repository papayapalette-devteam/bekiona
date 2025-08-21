import React, { useEffect, useState } from 'react'
import api from '../api'
import Sidebarcu from './Sidebarcu'
import Cuheader from './Cuheader'

function Myorders() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed)

  const email = localStorage.getItem('email')
  const [allorders, setallorders] = useState([])

  const getallorders = async () => {
    const resp = await api.get(`viewordersbyemail/${email}`)
    setallorders(resp.data.order)
  }

  useEffect(() => {
    getallorders()
  }, [])

  return (
    <div className="myorders-page">
      <Sidebarcu />

      <div className="main-content">
        <Cuheader />

        <div className="orders-wrapper">
          {allorders.map((item, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <span className="shared-by">{item.email} shared this order with you.</span><br />
                <span className="created-date">{new Date(item.createdAt).toLocaleString()}</span>
              </div>

              {Array.isArray(item.cartItems) && item.cartItems.length > 0 ? (
                <>
                  {item.cartItems.map((cartItem, cartIndex) => (
                    <div key={cartIndex} className="cart-item">
                      <img
                        src={cartItem.product_image}
                        alt={cartItem.product_name}
                        className="product-image"
                      />
                      <div className="product-details">
                        <h3 className="product-name">{cartItem.product_name}</h3>
                        <p className="product-price">₹ {cartItem.product_price}</p>
                        <p className="product-qty">Quantity: {cartItem.product_quantity1}</p>
                      </div>
                      <div className="delivery-msg">
                        {cartItem.delivery_message}
                      </div>
                    </div>
                  ))}

                  <div className="info-section">
                    <div className="tracking-info">
                      <strong>Tracking Details:</strong><br />
                      AWB No.: {item.shipment_id}<br />
                      Shipment Id: {item.tracking_id}<br />
                      Payment Date: {new Date(item.paymentDate).toLocaleString()}
                    </div>

                    <div className="payment-info">
                      <strong>Payment Details:</strong><br />
                      Payment Id: {item.paymentId}<br />
                      Payment Status: {item.payment_status}<br />
                      Order Id: {item.orderid}
                    </div>
                  </div>
                </>
              ) : (
                <p className="no-items-msg">No cart items available</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        .myorders-page {
          display: flex;
          flex-direction: row;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
          font-family: 'Roboto', sans-serif;
        }

        .orders-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 120px;
        }

        .order-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .order-header {
          background-color: #f1f1f1;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }

        .shared-by {
          color: blue;
        }

        .created-date {
          color: gray;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 15px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .product-details {
          flex: 1;
          min-width: 180px;
        }

        .product-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
        }

        .product-price {
          font-size: 16px;
          font-weight: 500;
          color: #28a745;
        }

        .product-qty {
          font-size: 14px;
          color: black;
        }

        .delivery-msg {
          font-size: 14px;
          color: #888;
          min-width: 140px;
        }

        .info-section {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          margin-top: 20px;
          font-size: 14px;
          color: #555;
        }

        .no-items-msg {
          font-size: 14px;
          color: #888;
        }

        /* Responsive for Tablet */
        @media (max-width: 1024px) {
          .main-content {
            margin-left: 200px;
          }

          .product-image {
            width: 70px;
            height: 70px;
          }

          .product-name,
          .product-price {
            font-size: 14px;
          }
        }

        /* Responsive for Mobile */
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 10px;
          }

          .orders-wrapper {
            margin-top: 80px;
          }

          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .info-section {
            flex-direction: column;
          }

          .product-image {
            width: 100%;
            height: auto;
            max-width: 100%;
          }

          .delivery-msg {
            min-width: auto;
            width: 100%;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default Myorders
