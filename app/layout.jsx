import Navbar from '@/components/Navbar.jsx';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'LaMorada | The Home For All Properties',
    description: 'Find your dream home',
    keywords: 'rental, find properties, find houses, find rentals'
}

const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>

    )
}

export default MainLayout