import localFont from "next/font/local";
import "./globals.css";
import Header from  "../components/Header";
import { Toaster } from  "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AI-TRIP PLANNER",
  description: "AI-TRIP PLANNER",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
        <Header />
        {children}
        <Toaster />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
