const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const swaggerDocs = require('./swagger');

const { createError } = require('./src/utils/helper.util');
const newsRoutes = require('./src/routes/news.route');
const workScheduleRoutes = require('./src/routes/work-schedule.route');
const medicalPackageRoutes = require('./src/routes/medical-package.route');
const serviceRoutes = require('./src/routes/service.route');
const specialtyRoutes = require('./src/routes/specialty.route');
const medicineCategoryRoutes = require('./src/routes/medicine-category.route');
const medicineRoutes = require('./src/routes/medicine.route');
const applicableObjectRoutes = require('./src/routes/applicable-object.route');
const clinicRoutes = require('./src/routes/clinic.route');
const hospitalRoutes = require('./src/routes/hospital.route');
const contractRoutes = require('./src/routes/contract.route');
const branchRoutes = require('./src/routes/branch.route');
const resultRoutes = require('./src/routes/result.route');
const invoiceRoutes = require('./src/routes/invoice.route');
const contactRoutes = require('./src/routes/contact.route');
const provinceRoutes = require('./src/routes/province.route');
const appointmentRoutes = require('./src/routes/appointment.route');
const roleRoutes = require('./src/routes/role.route');
const userRoutes = require('./src/routes/user.route');
const doctorRoutes = require('./src/routes/doctor.route');
const patientRoutes = require('./src/routes/patient.route');
const staffRoutes = require('./src/routes/staff.route');
const authRoutes = require('./src/routes/auth.route');
const app = express();

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", ['http://localhost:5173', 'http://127.0.0.1:5173']);
//     next();
// });
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors({
//     origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
//     methods: "GET, PUT, POST, DELETE, PATCH",
//     credentials: true
// }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
swaggerDocs(app, process.env.PORT);

// app.use('/', (req, res, next) => {
//     res.send('Hello from E-BookingHealthcare');
// });
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/medical-packages', medicalPackageRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/specialties', specialtyRoutes);
app.use('/api/v1/medicine-categories', medicineCategoryRoutes);
app.use('/api/v1/medicines', medicineRoutes);
app.use('/api/v1/applicable-objects', applicableObjectRoutes);
app.use('/api/v1/clinics', clinicRoutes);
app.use('/api/v1/hospitals', hospitalRoutes);
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/contracts', contractRoutes);
app.use('/api/v1/results', resultRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/medicines', medicineRoutes);
app.use('/api/v1/provinces', provinceRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/work-schedules', workScheduleRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/staffs', staffRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(function (req, res, next) {
    next(createError(404, 'Endpoint not found.'));
});

app.use((err, req, res, next) => {
    let errorMessage;
    let statusCode;

    console.log(err);

    if (err?.length > 0) {
        statusCode = 400;
        errorMessage = err[0].msg || 'Bad request';
        return res.status(statusCode).json({
            error: errorMessage
        });
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = err.message || 'Bad request';
        return res.status(statusCode).json({
            error: errorMessage
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: "Token hết hạn"
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: "Token không đúng"
        });
    }

    switch (err.statusCode) {
        case 400:
            statusCode = 400;
            errorMessage = err.message || 'Bad request';
            break;
        case 401:
            statusCode = 401;
            errorMessage = err.message || 'Unauthorized';
            break;
        case 403:
            statusCode = 403;
            errorMessage = err.message || 'Forbidden';
            break;
        case 404:
            statusCode = 404;
            errorMessage = err.message || 'Not found';
            break;
        case 409:
            statusCode = 409;
            errorMessage = err.message || 'Conflict';
            break;
        default:
            statusCode = 500;
            errorMessage = 'An unknown error occurred';
    }

    return res.status(statusCode).json({
        error: errorMessage
    });
});

module.exports = app;