const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

// Swagger UI assets from CDN for Vercel compatibility
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const JS_URLS = [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js"
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCssUrl: CSS_URL,
    customJs: JS_URLS
}));

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
            "style-src": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
            "img-src": ["'self'", "data:", "cdnjs.cloudflare.com"],
        },
    },
}));

app.get('/', (req, res) => {
    res.json({
        message: 'ExpertSync API is live',
        documentation: '/api-docs',
        version: '1.0.0'
    });
});
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/experts', require('./routes/expertRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'API route not found' });
});

app.use(errorHandler);

module.exports = app;
