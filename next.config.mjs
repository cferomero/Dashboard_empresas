/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configurando las rutas y puertos de las imagenes
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
