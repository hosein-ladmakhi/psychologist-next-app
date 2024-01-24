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
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.pdf$/i,
            use: 'file-loader'
        })
        config.module.rules.push({
            test: /\.node/,
            use: 'raw-loader',
        });
        return config
    },
}

module.exports = nextConfig
