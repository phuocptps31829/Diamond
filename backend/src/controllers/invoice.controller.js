const InvoiceModel = require('../models/invoice.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllInvoices: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const totalRecords = await InvoiceModel.countDocuments({ isDeleted: false });

            const invoices = await InvoiceModel
                .find({
                    isDeleted: false,
                })
                .populate({
                    path: 'appointmentID',
                    populate: {
                        path: 'patientID',
                    }
                })
                .skip(noPaginated ? undefined : skip)
                .limit(noPaginated ? undefined : limitDocuments)
                .sort({
                    ...sortOptions,
                    createdAt: -1
                });

            if (!invoices.length) {
                createError(404, "No invoices found.");
            }

            const formattedInvoices = invoices.map(invoice => {
                const formattedInvoice = {
                    ...invoice.toObject(),
                    patient: {
                        _id: invoice.appointmentID?.patientID._id,
                        fullName: invoice.appointmentID?.patientID.fullName,
                    },
                    status: invoice.appointmentID?.payment?.status,
                };
                delete formattedInvoice.appointmentID;
                return formattedInvoice;
            });

            return res.status(200).json({
                page: page || 1,
                message: 'Invoices retrieved successfully.',
                data: formattedInvoices,
                totalRecords
            });
        } catch (error) {
            next(error);
        }
    },
    getInvoiceByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const invoice = await InvoiceModel.findOne({
                isDeleted: false,
                _id: id
            });

            if (!invoice) {
                createError(404, "invoice not found.");
            }

            return res.status(200).json({
                message: 'Invoice retrieved successfully.',
                data: invoice,
            });
        } catch (error) {
            next(error);
        }
    }
};