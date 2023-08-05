// There are 2 ways to verify a token
// 1. domain.com/verifytoken/aidjflkajf - In this way we can extract token directly from params - this approach is better if we are doing everything from the server component
// 2. domain.com/verifytoken?aidjflkajf - IN this case when we have a question mark then we can search through window.location.search - this approach is better when we are using a client component

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    console.log("VAlue of user id: =====",userId)
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    console.log("hashed Token is:", hashedToken)

    //Verify token and forgot password - adding these in a token - so verifytoken first
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    else if(emailType == "RESET"){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
        })
    }

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.TRANSPORT_USER,
          pass: process.env.TRANSPORT_PASS
        }
      });

    const mailOptionsForVerifyEmail = {
        from: "baquofauloummau-9180@yopmail.com",
        to: email,
        subject: emailType == "VERIFY" ? "Verify your email" : "Reset your Password",
        html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${emailType == "VERIFY" ? "Verify your email" : "Reset your password"} or copy paste the link in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
    }
    const mailOptionsForResetPassword = {
        from: "baquofauloummau-9180@yopmail.com",
        to: email,
        subject: emailType == "VERIFY" ? "Verify your email" : "Reset your Password",
        html: `<p>Click <a href='${process.env.DOMAIN}/forgotpassword?token=${hashedToken}'>here</a> to ${emailType == "VERIFY" ? "Verify your email" : "Reset your password"} or copy paste the link in your browser <br> ${process.env.DOMAIN}/forgotpassword?token=${hashedToken} </p>`
    }
    // console.log("Reset password ====",mailOptionsForResetPassword);
    // const mailResponse = await transport.sendMail(mailOptions);
    const mailResponse = emailType == "VERIFY" ? await transport.sendMail(mailOptionsForVerifyEmail) : await transport.sendMail(mailOptionsForResetPassword);
    // const mailResponse = await transport.sendMail(mailOptionsForResetPassword);
    return mailResponse;

    //what if the verify token is for forgotPassword - we need to grab the password from the request body have to submit that as well
  } catch (error: any) {
    throw new Error(error.message);
  }
};
