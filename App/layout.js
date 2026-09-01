import "./globals.css";

export const metadata = {
  title: "FlyHack — Encuentra rutas más inteligentes",
  description: "Prototipo de buscador de oportunidades de vuelos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
