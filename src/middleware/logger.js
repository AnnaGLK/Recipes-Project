// middleware/logger.js
import morgan from "morgan";

// Custom token for timestamp
morgan.token("timestamp", () => new Date().toISOString());

// Format: [timestamp] METHOD URL STATUS - response-time ms
const loggerFormat = "[:timestamp] :method :url :status - :response-time ms";

export const logger = morgan(loggerFormat);
