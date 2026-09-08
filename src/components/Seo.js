import React from "react";
import { Helmet } from "react-helmet";

export default function Seo({ title = "Zaynich Component Layout" }) {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/assets/img/Z wings.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
}
