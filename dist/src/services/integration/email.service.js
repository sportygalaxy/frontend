"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetCodeEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorResponse_1 = require("../../utils/errorResponse");
const constants_1 = require("../../constants");
const constants_2 = require("../../constants");
dotenv_1.default.config();
class EmailService {
    constructor(config) {
        this.transporter = nodemailer_1.default.createTransport(config);
    }
    sendEmail(mailOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log(`Email sent ${mailOptions.to} successfully`);
                return;
            }
            catch (error) {
                console.error(`Error sending email to ${mailOptions.to}:`, error.message);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.EMAIL_FAILED, constants_2.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
const createEmailConfig = (provider) => {
    switch (provider) {
        case "namecheap":
            return {
                host: process.env.NAMECHEAP_HOST,
                port: parseInt(process.env.NAMECHEAP_PORT, 10),
                secure: true, // typically true for port 465, false for 587
                auth: {
                    user: process.env.NAMECHEAP_USER,
                    pass: process.env.NAMECHEAP_PASS,
                },
            };
        case "gmail":
            return {
                host: process.env.GMAIL_HOST,
                port: parseInt(process.env.NAMECHEAP_PORT, 10),
                secure: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            };
        // Add more providers as needed
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
};
const sendVerificationEmail = (provider, email, name, url) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = createEmailConfig(provider);
    const emailService = new EmailService(emailConfig);
    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: "Email Verification",
        html: `
      <div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#000">
        <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px">
        <span>Action required: Activate your account</span>
      </div>
      <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto">
        <span>Hello ${name}</span>
        <div style="padding:20px 0">
          <span style="padding:1.5rem 0">You recently created an account. To complete your registration, please confirm your account.</span>
        </div>
        <a href=${url} style="width:200px;padding:10px 15px;background:#000;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br>
        <div style="padding-top:20px">
          <span style="margin:1.5rem 0;color:#898f9c">This allows you to buy all gym and sport equipment. Once registered, you can purchase our products and much more.</span>
        </div>
      </div>
    `,
    };
    yield emailService.sendEmail(mailOptions);
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendResetCodeEmail = (provider, email, name, code) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = createEmailConfig(provider);
    const emailService = new EmailService(emailConfig);
    const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: "Reset sporty galaxy password",
        html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#000"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a  style="width:200px;padding:10px 15px;background:#000;color:#fff;text-decoration:none;font-weight:600">${code}</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
    };
    return yield emailService.sendEmail(mailOptions);
});
exports.sendResetCodeEmail = sendResetCodeEmail;
