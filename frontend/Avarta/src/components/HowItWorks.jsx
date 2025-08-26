import React from "react";

const HowItWorks = () => {
return (
    <section style={{ padding: "5rem 0", backgroundColor: "black", color: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2.5rem" }}>How It Works</h2>
        <ol style={{ listStyle: "none", padding: 0, margin: "0 auto", maxWidth: "40rem", textAlign: "left" }}>
            <li style={{ marginBottom: "1.5rem" }}>📸 Upload or capture trash image.</li>
            <li style={{ marginBottom: "1.5rem" }}>🧾 ASTRA identifies the material type.</li>
            <li>📍 Suggests nearest recycling plants or home recycling tips.</li>
        </ol>
    </section>
);
};

export default HowItWorks;
