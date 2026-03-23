const nextConfig = {

    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'localhost' },
            { protocol: 'https', hostname: 'i.pinimg.com' },
            { protocol: 'https', hostname: 'wallpapersmug.com' },
            { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
            { protocol: 'https', hostname: 'img.freepik.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
            { protocol: 'https', hostname: 'cdn.pixabay.com' },
            { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
            { protocol: 'https', hostname: 'fiverr-res.cloudinary.com' },
            { protocol: 'https', hostname: 'img.icons8.com' },
        ],
    }
}

module.exports = nextConfig
