/** @type {import('next').NextConfig} */

const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           // value: `public, max-age=${process.env.NEXT_PUBLIC_CACHE_MAX_AGE}, must-revalidate`,
  //           value: `no-cache, no-store, must-revalidate`,
  //         },
  //       ],
  //     },
  //   ]
  // },
  // webpack: (config, { buildId }) => {
  //   // Append the build ID to the output filenames
  //   config.output.filename = `[name].${buildId}.js`
  //   config.output.chunkFilename = `[name].${buildId}.chunk.js`
  //   // Return the modified configuration
  //   return config
  // },
}

module.exports = nextConfig
