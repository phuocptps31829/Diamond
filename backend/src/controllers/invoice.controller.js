const InvoiceModel = require('../models/invoice.model');
const { createError } = require("../utils/helper.util");

module.exports = {
    getAllInvoices: async (req, res, next) => {
        try {
            let { limitDocuments, skip, page, sortOptions, search } = req.customQueries;
            let noPaginated = req.query?.noPaginated === 'true';

            const invoices = await InvoiceModel
                .find({})
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

            let formattedInvoices = invoices.map(invoice => {
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

            if (search) {
                formattedInvoices = formattedInvoices.filter(invoice => {
                    return invoice?.patient?.fullName.toLowerCase().includes(search.toLowerCase()) ||
                        invoice?.invoiceCode?.toLowerCase().includes(search.toLowerCase()) ||
                        invoice?.status.toLowerCase().includes(search.toLowerCase());
                });
            }

            return res.status(200).json({
                page: page || 1,
                message: 'Invoices retrieved successfully.',
                data: noPaginated ? formattedInvoices : formattedInvoices.slice(skip, skip + limitDocuments),
                totalRecords: formattedInvoices.length
            });
        } catch (error) {
            next(error);
        }
    },
    getInvoiceByID: async (req, res, next) => {
        try {
            const { id } = req.params;

            const invoice = await InvoiceModel.findOne({

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