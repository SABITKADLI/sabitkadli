/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/candidate-assessment-platform',
        destination: `${process.env.CANDIDATE_ASSESSMENT_URL || 'https://candidate-assessment-platform.vercel.app'}/`,
      },
      {
        source: '/candidate-assessment-platform/:path*',
        destination: `${process.env.CANDIDATE_ASSESSMENT_URL || 'https://candidate-assessment-platform.vercel.app'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
