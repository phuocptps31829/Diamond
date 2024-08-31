const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const InvoiceModel = require('../models/invoice.model');
const { createError, errorValidator } = require("../utils/helper.util");
const AppointmentModel = require('../models/appointment.model');

const zaloPayConfig = {
    app_id: "554",
    key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
    key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const getAllInvoices = async (req, res, next) => {
    try {
        let { limitDocuments, skip, page, sortOptions } = req.customQueries;

        const totalRecords = await InvoiceModel.countDocuments({ isDeleted: false });

        const invoices = await InvoiceModel
            .find({ isDeleted: false })
            .skip(skip)
            .limit(limitDocuments)
            .sort(sortOptions);

        if (!invoices.length) {
            createError(404, "No invoices found.");
        }

        return res.status(200).json({
            page: page || 1,
            message: 'Invoices retrieved successfully.',
            data: invoices,
            totalRecords
        });
    } catch (error) {
        next(error);
    }
};

const getInvoiceByID = async (req, res, next) => {
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
};

const createInvoice = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const newInvoice = await InvoiceModel.create(req.body);

        return res.status(201).json({
            message: 'Invoice created successfully.',
            data: newInvoice
        });
    } catch (error) {
        next(error);
    }
};

const updateInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;

        errorValidator(req, res);

        const updatedInvoice = await InvoiceModel.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            { ...req.body },
            { new: true }
        );

        if (!updatedInvoice) {
            createError(404, 'Invoice not found.');
        }

        return res.status(201).json({
            message: 'Invoice updated successfully.',
            data: updatedInvoice
        });
    } catch (error) {
        next(error);
    }
};

const zaloPayPayment = async (req, res, next) => {
    const embed_data = {
        redirecturl: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox'
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: zaloPayConfig.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "zalopayapp",
        callback_url: 'https://82dc-2402-800-63a6-ea68-2994-7694-13e8-ebfa.ngrok-free.app/payment/zalopay-callback'
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = zaloPayConfig.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, zaloPayConfig.key1).toString();

    try {
        const response = await axios.post(zaloPayConfig.endpoint, null, { params: order });

        const result = response.data;
        console.log(result);

        return res.status(200).json({
            message: 'Zalopay show successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const zaloPayCallback = async (req, res, next) => {
    let result = {};

    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, zaloPayConfig.key2).toString();
        console.log("mac =", mac);


        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, zaloPayConfig.key2);
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

            result.return_code = 1;
            result.return_message = "success";
        }

        return res.status(200).json({
            message: 'Zalopay payment successfully',
            data: result
        });
    } catch (error) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = error.message;
        next(error);
    }
};

const momoPayment = async (req, res, next) => {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    console.log('before', req.body);
    //parameters
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'Thanh toán với MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = 'https://82dc-2402-800-63a6-ea68-2994-7694-13e8-ebfa.ngrok-free.app/api/v1/invoices/payment/momo/callback';
    var requestType = "captureWallet";
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = JSON.stringify(req.body);
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody)
        },
        data: requestBody
    };

    try {
        const result = await axios(options);
        console.log(result);

        return res.status(200).json({
            message: 'Momo show successfully',
            data: result.data
        });
    } catch (error) {
        next(error);
    }
};

const momoPaymentCallback = async (req, res, next) => {
    try {
        // body {
        //     partnerCode: 'MOMO',
        //     orderId: 'MOMO1724745040901',
        //     requestId: 'MOMO1724745040901',
        //     amount: 50000,
        //     orderInfo: 'Thanh toán với MoMo',
        //     orderType: 'momo_wallet',
        //     transId: 4108080069,
        //     resultCode: 0,
        //     message: 'Thành công.',
        //     payType: 'qr',
        //     responseTime: 1724745109119,
        //     extraData: '',
        //     signature: '6495683ceb2e8d611aea72f79361e23cf0938f66f6d955e997d381ad33b5789f'
        //   }

        // {
        //     "patientID": "66afa9556d138253c13a840b",
        //     "doctorID": "66a0cf3878afeea6465f797d",
        //     "medicalPackageID": "669f725b253dce8de433cd3c",
        //     "clinicID": "66b9e9b1af688f020c09d5d1",
        //     "type": "Khám lần 1",
        //     "time": "2024-07-23T09:05:31.473+00:00",
        //     "status": "Chưa khám",
        //   }
        if (req.body.resultCode !== 0) {
            createError(400, "Paid fail.");
        }

        const { amount, signature, extraData } = req.body;

        const appointmentData = JSON.parse(extraData);

        const newAppointment = await AppointmentModel.create({
            ...appointmentData,
            paymentMethod: {
                method: "MoMo",
                signature: signature,
                isPaid: true
            }
        });

        const newInvoice = await InvoiceModel.create({
            appointmentID: newAppointment._id,
            price: +amount,
        });

        console.log('newap', newAppointment);
        console.log('newin', newInvoice);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllInvoices,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
    zaloPayPayment,
    zaloPayCallback,
    momoPayment,
    momoPaymentCallback
};