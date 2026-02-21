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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(cors());
app.use(helmet());
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
