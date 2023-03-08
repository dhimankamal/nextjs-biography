/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl:process.env.NEXT_PUBLIC_DOMAIN_URL,
    exclude: ["/404"],
    generateRobotsTxt: false,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          disallow: ["/404"]
        },
        { userAgent: "*", allow: "/" },
      ],
      // additionalSitemaps: [
      //   `${process.env.NEXT_PUBLIC_DOMAIN_URL}server-sitemap.xml`
      // ],
    },
  };