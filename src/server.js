const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Finance Data Processing Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.debug('SIGTERM received');
    server.close(() => {
        console.debug('HTTP server closed');
    });
});
