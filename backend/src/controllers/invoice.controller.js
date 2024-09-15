const qs = require('qs');
const crypto = require('crypto');
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');

const InvoiceModel = require('../models/invoice.model');
const AppointmentModel = require('../models/appointment.model');
const PatientModel = require('../models/patient.model');
const OrderNumberModel = require('../models/order-number.model');
const { createError, errorValidator } = require("../utils/helper.util");
const { time } = require('console');
const { default: mongoose } = require('mongoose');

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
    try {
        const embed_data = {
            redirecturl: process.env.ZALO_PAY_REDIRECT_URL
        };

        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: process.env.ZALO_PAY_APP_ID,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(req.body),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "",
            callback_url: process.env.ZALO_PAY_CALLBACK_URL
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = process.env.ZALO_PAY_APP_ID + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, process.env.ZALO_PAY_KEY_1).toString();

        const response = await axios.post(process.env.ZALO_PAY_ENTPOINT, null, { params: order });

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

        let mac = CryptoJS.HmacSHA256(dataStr, process.env.ZALO_PAY_KEY_2).toString();
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
            let dataJson = JSON.parse(dataStr, process.env.ZALO_PAY_KEY_2);
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
    try {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        errorValidator(req, res);

        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const orderInfo = 'Thanh toán với MoMo';
        const partnerCode = 'MOMO';
        const redirectUrl = process.env.MOMO_REDIRECT_URL;
        const ipnUrl = process.env.MOMO_CALLBACK_URL;
        const requestType = "captureWallet";
        const amount = req.body.price;
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = JSON.stringify(req.body);
        const orderGroupId = '';
        const autoCapture = true;
        const lang = 'vi';

        const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

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
            url: process.env.MOMO_CREATE_URL,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(requestBody)
            },
            data: requestBody
        };

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
        // "patientID": "66afa9556d138253c13a840b",
        // "workScheduleID": "66cf53bd99d5cbb097472d70",
        // "medicalPackageID": "669f725b253dce8de433cd3c",
        // "type": "Khám lần 1",
        // "time": "2024-07-23T09:05:31.473+00:00",
        // "status": "Chờ xác nhận",
        // "price": 433344,
        // "appointmentHelpUser": {
        //     "fullName": "help",
        //     "phoneNumber": "string",
        //     "email": "string",
        //     "gender": "string",
        //     "dateOfBirth": "2024-08-04T16:16:21.586Z",
        //     "address": {
        //       "province": "string",
        //       "district": "string",
        //       "ward": "string",
        //       "street": "string"
        //     },
        //     "citizenIdentificationNumber": 0,
        //     "occupation": "string",
        //     "ethnic": "string",
        //     "password": "string"
        // }
        //   }
        if (req.body.resultCode !== 0) {
            createError(400, "Paid fail.");
        }

        const { amount, signature, extraData } = req.body;

        const appointmentData = JSON.parse(extraData);

        let appointmentHelpID = null;
        if (appointmentData.appointmentHelpUser) {
            const newPatient = await axios.post(
                process.env.SERVER_LOCAL_API_URL + '/patients/add-full-info',
                JSON.stringify(appointmentData.appointmentHelpUser),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("data momo", newPatient.data.data);
            const newAppointmentHelp = await AppointmentModel.create({
                ...appointmentData,
                patientID: newPatient.data.data._id,
                appointmentHelpID: null
            });
            appointmentHelpID = newAppointmentHelp._id;
            console.log('for help', newAppointmentHelp);

            const updatedPatient = await PatientModel.findByIdAndUpdate(
                appointmentData.patientID,
                { $push: { relatedPatientsID: newPatient.data.data._id } },
                { new: true }
            );

            console.log('update', updatedPatient);
        }

        const newAppointment = await AppointmentModel.create({
            ...appointmentData,
            payment: {
                method: "MOMO",
                refundCode: signature,
                status: "Đã thanh toán"
            },
            appointmentHelpID
        });

        const appointmentIDsInDay = await AppointmentModel
            .find({
                time: {
                    $gte: `${newAppointment.time.slice(0, 10)}T00:00:00.000Z`,
                    $lt: `${newAppointment.time.slice(0, 10)}T23:59:59.999Z`
                }
            })
            .select("_id");

        console.log(appointmentIDsInDay);

        const lastOrderNumberInDay = await OrderNumberModel
            .find({
                appointmentID: {
                    $in: appointmentIDsInDay.map(id => new mongoose.Types.ObjectId(id))
                }
            })
            .sort({ number: -1 })
            .limit(1);

        console.log("last", lastOrderNumberInDay);

        const newOrderNumber = await OrderNumberModel.create({
            appointmentID: appointmentHelpID || newAppointment._id,
            number: lastOrderNumberInDay[0]?.number ? +lastOrderNumberInDay[0].number + 1 : 1,
            priority: 0
        });

        console.log('newor', newOrderNumber);

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
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const partnerCode = 'MOMO';
    const amount = 40000;
    const orderId = new Date().getTime();
    const requestId = orderId + 1;
    const description = 'hi';
    const transId = 4108080069;

    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&description=" + description + "&orderId=" + orderId + "&partnerCode=" + partnerCode + "&requestId=" + requestId + "&transId=" + transId;

    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    const requestBody = {
        "partnerCode": partnerCode,
        "orderId": orderId,
        "requestId": requestId,
        "amount": amount,
        "transId": transId,
        "lang": "vi",
        "description": description,
        "signature": signature
    };
    try {
        const data = await axios({
            url: process.env.MOMO_REFUND_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(requestBody)
        });
        console.log(data);
        return res.status(201).json({
            message: "Refund MOMO successfully",
            data: data.data
        });
    } catch (error) {
        next(error);
    }
};

let vnpayAppointmentData = {};
const vnpayPayment = async (req, res, next) => {
    try {
        errorValidator(req, res);

        process.env.TZ = 'Asia/Ho_Chi_Minh';

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let tmnCode = process.env.VNPAY_TMNCODE;
        let secretKey = process.env.VNPAY_HASH_SECRET;
        let vnpUrl = process.env.VNPAY_CREATE_URL;
        let returnUrl = process.env.VNPAY_RETURN_URL;
        let orderId = moment(date).format('DDHHmmss');
        let amount = 10000;
        let bankCode = "NCB";

        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toán đặt lịch khám';
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

        // vnpayAppointmentData = {
        //     ...req.body,
        //     payment: {
        //         method: "VNPAY",
        //         refundCode: signed,
        //         status: "Đã thanh toán"
        //     },
        //     price: req.body.price
        // };
        vnpayAppointmentData = req.body;
        console.log(vnpayAppointmentData);
        // return res.redirect(vnpUrl);

        return res.status(200).json({
            message: 'VNpay payment successfully',
            data: vnpUrl
        });
    } catch (error) {
        next(error);
    }
};

const vnpayIPN = async (req, res, next) => {
    const vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params['vnp_Command'] = 'pay';
    console.log('day ne');
    vnp_Params = sortObject(vnp_Params);
    const secretKey = process.env.VNPAY_HASH_SECRET;
    const signData = qs.stringify(vnp_Params, { encode: false });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        // const orderId = vnp_Params['vnp_TxnRef'];
        // const rspCode = vnp_Params['vnp_ResponseCode'];

        try {
            const options = {
                method: "POST",
                url: process.env.VNPAY_TRANSACTION_URL,
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

        let secretKey = process.env.VNPAY_HASH_SECRET;

        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            let newAppointmentssssss = null;

            let newPatient = null;
            if (vnpayAppointmentData.appointmentHelpUser) {
                newPatient = await axios.post(
                    process.env.SERVER_LOCAL_API_URL + '/patients/add-full-info',
                    JSON.stringify(vnpayAppointmentData.appointmentHelpUser),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                console.log("new pa", newPatient.data.data);
            }

            ///
            for (const appointment of vnpayAppointmentData.data) {
                let newAppointment = null;
                if (newPatient) {
                    newAppointment = await AppointmentModel.create({
                        ...appointment,
                        patientID: newPatient.data.data._id,
                        patientHelpID: vnpayAppointmentData.patientID
                    });
                    console.log('for help', newAppointment);

                    const updatedPatient = await PatientModel.findByIdAndUpdate(
                        vnpayAppointmentData.patientID,
                        { $push: { relatedPatientsID: newPatient.data.data._id } },
                        { new: true }
                    );

                    console.log('update', updatedPatient);
                } else {
                    newAppointment = await AppointmentModel.create({
                        ...appointment,
                        patientID: vnpayAppointmentData.patientID,
                    });

                    console.log('for you', newAppointment);

                }

                const appointmentIDsInDay = await AppointmentModel
                    .find({
                        time: {
                            $gte: `${newAppointment.time.slice(0, 10)}T00:00:00.000Z`,
                            $lt: `${newAppointment.time.slice(0, 10)}T23:59:59.999Z`
                        }
                    })
                    .select("_id");

                console.log('inday', appointmentIDsInDay);

                const lastOrderNumberInDay = await OrderNumberModel
                    .find({
                        appointmentID: {
                            $in: appointmentIDsInDay.map(id => new mongoose.Types.ObjectId(id))
                        }
                    })
                    .sort({ number: -1 })
                    .limit(1);

                console.log("last", lastOrderNumberInDay);

                const newOrderNumber = await OrderNumberModel.create({
                    appointmentID: newAppointment._id,
                    number: lastOrderNumberInDay[0]?.number ? +lastOrderNumberInDay[0].number + 1 : 1,
                    priority: 0
                });

                console.log('newor', newOrderNumber);

                const newInvoice = await InvoiceModel.create({
                    appointmentID: newAppointment._id,
                    price: +appointment.price,
                });

                console.log('newin', newInvoice);
            }

            return res.status(201).json({
                message: "Appointment created successfully",
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

    let vnp_TmnCode = process.env.VNPAY_TMNCODE;
    let secretKey = process.env.VNPAY_HASH_SECRET;

    let vnp_TxnRef = 'Thanh toán PAY';
    let vnp_TransactionDate = moment(date).format('yyyyMMddHHmmss');
    let vnp_Amount = 4000 * 100;
    let vnp_TransactionType = '02';
    let vnp_CreateBy = 'khachhang';

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
            url: process.env.VNPAY_TRANSACTION_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(dataObj)
        };

        const data = await axios(options);
        console.log(data);

        return res.status(201).json({
            message: "Refund VNPAY successfully",
            data: data.data
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


// {
//     "patientID": "66afa9556d138253c13a840b",
//     "appointmentHelpUser": {
//         "fullName": "help",
//         "phoneNumber": "string",
//         "email": "string",
//         "gender": "string",
//         "dateOfBirth": "2024-08-04T16:16:21.586Z",
//         "address": {
//             "province": "string",
//             "district": "string",
//             "ward": "string",
//             "street": "string"
//         },
//         "citizenIdentificationNumber": 0,
//         "occupation": "string",
//         "ethnic": "string",
//         "password": "string"
//     },
//     "data": [
//         {
//             "workScheduleID": "66cf53bd99d5cbb097472d70",
//             "medicalPackageID": "669f725b253dce8de433cd3c",
//             "type": "Khám lần 1",
//             "time": "2024-07-23T09:05:31.473+00:00",
//             "status": "Chờ xác nhận",
//             "price": 433344,
//         }
//     ]
// }