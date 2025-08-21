import React, { useState, useEffect } from 'react';

const OrderTracking = ({ orderId }) => {
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get-order-tracking/${orderId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch order tracking data");
                }
                const data = await response.json();
                setTrackingData(data);
            } catch (error) {
                console.error('Error fetching order tracking:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrackingData();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (!trackingData) return <div>Order not found</div>;

    return (
        <div>
            <h3>Order Tracking</h3>
            <p><strong>Order ID:</strong> {trackingData.orderId}</p>
            <p><strong>Tracking ID:</strong> {trackingData.trackingId}</p>
            <p><strong>Status:</strong> {trackingData.trackingStatus}</p>
        </div>
    );
};

export default OrderTracking;
