import Chatbot from "./Chatbot";

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif" }}>

      {/* HERO SECTION */}
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
          Turn Website Visitors Into WhatsApp Leads — Automatically
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          This is a live demo of an AI chatbot that captures leads and redirects them to WhatsApp.
        </p>

        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          👉 Click the chat icon in the bottom right to try it
        </p>
      </section>

      {/* OPTIONAL: FAKE WEBSITE CONTENT */}
      <section style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>Example Business Website</h2>
        <p>
          Imagine this is your actual website. This chatbot engages visitors,
          answers questions, and converts them into leads automatically.
        </p>
      </section>

      {/* CHATBOT (still floating as before) */}
      <Chatbot />

    </main>
  );
}
