const allowedOrigins = [
    "https://remindify.vercel.app",
    "https://remindify-git-main-czhexg.vercel.app",
    "https://remindify-czhexg.vercel.app",
    "https://remindify-vlcsdqcvu-czhexg.vercel.app",
    // cron-job.org ips
    "https://195.201.26.157",
    "https://116.203.134.67",
    "https://116.203.129.16",
    "https://23.88.105.37",
    "https://128.140.8.200",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

export default corsOptions;
