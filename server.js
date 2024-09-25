const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer({});

// Serve static files from the public directory
app.use(express.static('public'));

// Proxy endpoint
app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;

    // If no target URL is provided
    if (!targetUrl) {
        return res.status(400).send('URL parameter is required.');
    }

    // Forward the request to the target URL
    proxy.web(req, res, { target: targetUrl, changeOrigin: true }, (err) => {
        console.error('Proxy error:', err);
        res.status(500).send('Something went wrong with the proxy.');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
