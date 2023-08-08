export default () => ({
  port: parseInt(process.env.PORT) || 5000,
  security: {
    secret: process.env.PRIVATE_KEY ?? '42',
    jwt: {
      ttl: process.env.JWT_TTL ?? '86400s',
      refreshTtl: process.env.JWT_REFRESH_TTL ?? '1209600s',
    },
  },
  static: {
    servePath: '/static',
    dir: process.env.STATIC_DIR,
  },
  dates: {
    currentYear: process.env.CURRENT_YEAR ?? 2022,
    currentSemester: process.env.CURRENT_SEMESTER ?? 1,
  },
});
