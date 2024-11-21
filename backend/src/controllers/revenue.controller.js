const InvoiceModel = require('../models/invoice.model');
const { createError } = require('../utils/helper.util');

module.exports = {
    getRevenue: async (req, res, next) => {
        try {
            const invoices = await InvoiceModel
                .find({
                    isDeleted: false
                })
                .populate('appointmentID')
                .lean();

            // Revenue by day
            const currentDate = new Date().toISOString().slice(0, 10);
            const previousDate = new Date();
            previousDate.setDate(previousDate.getDate() - 1);
            const previousDateString = previousDate.toISOString().slice(0, 10);
            presentRevenueDay = invoices.reduce((acc, invoice) => {
                const invoiceDate = new Date(invoice.createdAt).toISOString().slice(0, 10);
                if (invoiceDate === currentDate) {
                    console.log(invoice);
                    return acc + invoice.price;
                }
                return acc;
            }, 0);
            previousRevenueDay = invoices.reduce((acc, invoice) => {
                const invoiceDate = new Date(invoice.createdAt).toISOString().slice(0, 10);
                if (invoiceDate === previousDateString) {
                    return acc + invoice.price;
                }
                return acc;
            }, 0);

            // Revenue by month
            const currentMonth = new Date().toISOString().slice(0, 7);
            const previousMonth = new Date();
            previousMonth.setMonth(previousMonth.getMonth() - 1);
            const previousMonthString = previousMonth.toISOString().slice(0, 7);
            presentRevenueMonth = invoices.reduce((acc, invoice) => {
                const invoiceMonth = new Date(invoice.createdAt).toISOString().slice(0, 7);
                if (invoiceMonth === currentMonth) {
                    return acc + invoice.price;
                }
                return acc;
            }, 0);
            previousRevenueMonth = invoices.reduce((acc, invoice) => {
                const invoiceMonth = new Date(invoice.createdAt).toISOString().slice(0, 7);
                if (invoiceMonth === previousMonthString) {
                    return acc + invoice.price;
                }
                return acc;
            }, 0);

            // Revenue by quarter
            const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
            const currentYear = new Date().getFullYear();
            const previousQuarter = currentQuarter === 1 ? 4 : currentQuarter - 1;
            const previousYear = currentQuarter === 1 ? currentYear - 1 : currentYear;
            const presentRevenueQuarter = invoices.reduce((acc, invoice) => {
                const invoiceQuarter = Math.floor((new Date(invoice.createdAt).getMonth() + 3) / 3);
                const invoiceYear = new Date(invoice.createdAt).getFullYear();
                if (invoiceQuarter === currentQuarter && invoiceYear === currentYear) {
                    return acc + invoice.price;
                }
                return acc;
            }, 0);
            const previousRevenueQuarter = invoices.reduce((acc, invoice) => {
                const invoiceQuarter = Math.floor((new Date(invoice.createdAt).getMonth() + 3) / 3);
                const invoiceYear = new Date(invoice.createdAt).getFullYear();
                if (invoiceQuarter === previousQuarter && invoiceYear === previousYear) {
                    return acc + invoice.price;
                }
                return acc;
            }, 0);

            // Get revenue by year
            let byYearRevenue = {};
            invoices.forEach(invoice => {
                const invoiceYear = new Date(invoice.createdAt).getFullYear();
                if (!byYearRevenue[invoiceYear]) {
                    byYearRevenue[invoiceYear] = {};
                }
                const invoiceMonth = new Date(invoice.createdAt).getMonth() + 1;
                if (!byYearRevenue[invoiceYear][invoiceMonth]) {
                    byYearRevenue[invoiceYear][invoiceMonth] = 0;
                }
                byYearRevenue[invoiceYear][invoiceMonth] += invoice.price;
            });

            const totalRevenue = invoices.reduce((acc, invoice) => {
                return acc + invoice.price;
            }, 0);

            return res.status(200).json({
                message: 'Revenue retrieved successfully.',
                data: {
                    byDay: {
                        previousRevenue: previousRevenueDay,
                        presentRevenue: presentRevenueDay,
                    },
                    byMonth: {
                        previousRevenue: previousRevenueMonth,
                        presentRevenue: presentRevenueMonth,
                    },
                    byQuarter: {
                        previousRevenue: previousRevenueQuarter,
                        presentRevenue: presentRevenueQuarter,
                    },
                    byYear: byYearRevenue,
                    totalRevenue
                }
            });
        } catch (error) {
            next(error);
        }
    },
};