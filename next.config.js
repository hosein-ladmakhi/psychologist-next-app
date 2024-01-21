/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                port: '4000',
                protocol: 'http'
            }
        ]
    }
}

module.exports = nextConfig
