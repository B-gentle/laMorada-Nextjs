import '@/assets/styles/globals.css';

export const metadata = {
    title: 'LaMorada | The Home For All Properties',
    description: 'Find your dream home',
    keywords: 'rental, find properties, find houses, find rentals'
}

const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div>
                    {children}
                </div>
            </body>
        </html>

    )
}

export default MainLayout