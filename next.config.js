/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	//TODO: in production you should only use images from your own domain because vercel WILL CHARGE YOU for bandwidth IN RESIZING
	images: {
		//TODO: domains are the domains you want to allow to use your images??
		// domains: ['www.si.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
		],
	},
};

module.exports = nextConfig;
