const requests = {}; // { ip: [timestamps...] }

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;       // 10 requests per window per IP

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests[ip]) {
    requests[ip] = [];
  }

  // keep only requests in the last WINDOW_SIZE
  requests[ip] = requests[ip].filter((ts) => now - ts < WINDOW_SIZE);

  if (requests[ip].length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: true,
      message: "Too many requests, please try again later.",
      statusCode: 429,
    });
  }

  // add new request timestamp
  requests[ip].push(now);

  next();
};
