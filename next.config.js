/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    webpack: config => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    images: {
        domains: [
            'images.unsplash.com',
            's3.amazonaws.com',
            'goerli.etherscan.io',
            'docs.matic.network'
        ],
    }
};

module.exports = nextConfig;