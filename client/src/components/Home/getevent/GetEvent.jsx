import React, {useEffect, useState} from "react";

export default function GetEvent() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const res = await fetch("http://localhost:3000/api/getevents");
            const data = await res.json();
            setEvents(data);
            setLoading(false);
        }
        catch (err) {
            console.error("Error fetching events:", err);
            setError("Failed to fetch events. Please try again later.");
            setLoading(false);
        }
    }

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading events...</h2>;
}
    
    if (error) {
        return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
    }

    return (
        <div style={{ padding: "2rem" }}>
        <h1 style={{ textAlign: "center" }}>Upcoming Events </h1>

        {events.length === 0 ? (
            <p style={{ textAlign: "center" }}>No events available</p>
        ) : (
            <div className="events-grid">
            {events.map((event, index) => (
                <div className="event-card" key={index}>
                <h2>{event.event_name}</h2>

                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Time:</strong> {event.event_time}</p>
                <p><strong>Location:</strong> {event.event_location}</p>
                <p><strong>Committee:</strong> {event.committee_name}</p>

                <p style={{ marginTop: "10px" }}>
                    {event.event_description}
                </p>
                </div>
            ))}
            </div>
        )}
        </div>

);
}


