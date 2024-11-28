import "./globals.css";
import { ToastContainer } from "./toast.js";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="background text-white overflow-x-hidden">
        <ToastContainer autoClose={1000} />
        <main className="min-h-screen flex-col flex items-center justify-center p-10">
          {children}
        </main>
      </body>
    </html>
  );
}
