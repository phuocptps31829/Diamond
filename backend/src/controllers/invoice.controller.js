const crypto = require('crypto');
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install mome
const qs = require('qs');

const InvoiceModel = require('../models/invoice.model');
const AppointmentModel = require('../models/appointment.model');
const { createError, errorValidator } = require("../utils/helper.util");

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

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: zaloPayConfig.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(req.body),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,
        description: `Lazada - Payment for the order #${transID}`,
        bank_code: "",
        callback_url: 'https://cc63-2402-800-63a6-ea68-381f-9dca-8e91-7cab.ngrok-free.app/payment/zalopay-callback'
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
    var redirectUrl = 'https://cosstewn.io.vn';
    var ipnUrl = 'https://cc63-2402-800-63a6-ea68-381f-9dca-8e91-7cab.ngrok-free.app/api/v1/invoices/payment/momo/callback';
    var requestType = "captureWallet";
    var amount = +10000;
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
        console.log(req.body.transId);
        const { amount, signature, extraData } = req.body;

        const appointmentData = JSON.parse(extraData);

        const newAppointment = await AppointmentModel.create({
            ...appointmentData,
            paymentMethod: {
                method: "MOMO",
                signature: signature,
                isPaid: true
            }
        });

        const newInvoice = await InvoiceModel.create({
            appointmentID: newAppointment._id,
            price: +amount,
        });

        return res.status(201).json({
            message: "Appointment created successfully",
            data: {
                ...newAppointment.toObject(),
                invoice: {
                    ...newInvoice.toObject()
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

const momoRefund = async (req, res, next) => {
    var accessKey = 'F8BBA842ECF85';
    var partnerCode = 'MOMO';
    var amount = 40000;
    var orderId = new Date().getTime();
    var requestId = orderId + 1;
    const description = 'hi';
    const transId = 144492817;

    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&description=" + description + "&orderId=" + orderId + "&partnerCode=" + partnerCode + "&requestId=" + requestId + "&transId=" + transId;
    const requestBody = {
        "partnerCode": partnerCode,
        "orderId": orderId,
        "requestId": requestId,
        "amount": amount,
        "transId": transId,
        "lang": "vi",
        "description": description,
        "signature": rawSignature
    };
    try {
        const data = await axios({
            url: 'https://test-payment.momo.vn/v2/gateway/api/refund',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(requestBody)
        });
        console.log(data);
        return res.status(201).json({
            message: "Refund MOMO successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

const vnpayCF = {
    "vnp_TmnCode": "D3YA7VY9",
    "vnp_HashSecret": "EAORMTHRBZJXXRNELCEUSIEOCEMWKKHQ",
    "vnp_Url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    "vnp_Api": "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    "vnp_ReturnUrl": "http://localhost:3500/api/v1/invoices/payment/vnpay_return"
};

let vnpayAppointmentData = {};

const vnpayPayment = async (req, res, next) => {

    errorValidator(req, res);

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = vnpayCF.vnp_TmnCode;
    let secretKey = vnpayCF.vnp_HashSecret;
    let vnpUrl = vnpayCF.vnp_Url;
    let returnUrl = vnpayCF.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = 10000;
    let bankCode = "NCB";

    // let locale = req.body.language;
    // if (locale === null || locale === '') {
    //     locale = 'vn';
    // }

    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = qs.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    try {
        vnpayAppointmentData = {
            ...req.body,
            paymentMethod: {
                method: "VNPAY",
                signature: signed,
                isPaid: true
            },
            tempPrice: 4000
        };

        return res.status(200).json({
            message: 'VNpay payment successfully',
            data: vnpUrl
        });
    } catch (error) {
        next(error);
    }
};

const vnpayIPN = async (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params['vnp_Command'] = 'pay';
    console.log('day ne');
    vnp_Params = sortObject(vnp_Params);
    var secretKey = vnpayCF.vnp_HashSecret;
    var qs = require('qs');
    var signData = qs.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        console.log(rspCode);
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        try {
            const options = {
                method: "POST",
                url: vnpayCF.vnp_Api,
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({ RspCode: '00', Message: 'success' }),
            };

            const data = await axios(options);

            console.log(data);
            return res.status(200).json({
                message: 'vnpagy cc successfully',
                data
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
};

const vnpayReturn = async (req, res, next) => {
    try {
        let vnp_Params = req.query;
        // vnp_Params['vnp_Command'] = 'pay';
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let tmnCode = vnpayCF.vnp_TmnCode;
        let secretKey = vnpayCF.vnp_HashSecret;


        let signData = qs.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            const newAppointment = await AppointmentModel.create(vnpayAppointmentData);

            const newInvoice = await InvoiceModel.create({
                appointmentID: newAppointment._id,
                price: +vnpayAppointmentData.tempPrice,
            });

            return res.status(201).json({
                message: "Appointment created successfully",
                data: {
                    ...newAppointment.toObject(),
                    invoice: {
                        ...newInvoice.toObject()
                    }
                }
            });
        } else {
            createError(400, "Signs not match");
        }
    } catch (error) {
        next(error);
    }
};

const vnpayRefund = async (req, res, next) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let vnp_TmnCode = vnpayCF.vnp_TmnCode;
    let secretKey = vnpayCF.vnp_HashSecret;
    let vnp_Api = vnpayCF.vnp_Api;

    let vnp_TxnRef = 'qq';
    let vnp_TransactionDate = moment(date).format('yyyyMMddHHmmss');;
    let vnp_Amount = 4000 * 100;
    let vnp_TransactionType = '02';
    let vnp_CreateBy = 'chinhdep trai';

    let currCode = 'VND';

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'refund';
    let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnp_TransactionNo = '0';

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer.from(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TransactionType': vnp_TransactionType,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_Amount': vnp_Amount,
        'vnp_TransactionNo': vnp_TransactionNo,
        'vnp_CreateBy': vnp_CreateBy,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };

    try {
        const options = {
            url: vnpayCF.vnp_Api,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(dataObj)
        };

        const data = await axios(options);

        return res.status(201).json({
            message: "Refund VNPAY successfully",
            data
        });
    } catch (error) {
        next(error);
    }
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    getAllInvoices,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
    zaloPayPayment,
    zaloPayCallback,
    momoPayment,
    momoPaymentCallback,
    vnpayPayment,
    vnpayIPN,
    vnpayReturn,
    vnpayRefund,
    momoRefund
};