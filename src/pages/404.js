import React from "react";
import "../styles/home.scss";

import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found — Zaynich">
      <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1>Page not found</h1>
        <p>Sorry, the page you were looking for doesn’t exist.</p>
      </section>
    </Layout>
  );
}
