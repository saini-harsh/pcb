import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-password',
  },
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"PCB Globe" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
      to,
      subject,
      html,
    })
    console.log('Message sent: %s', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

export const sendOrderConfirmationEmail = async (order: any, user: any) => {
  const subject = `Order Booked: ${order.projectName}`
  const html = `
    <h1>Order Confirmation</h1>
    <p>Hi ${user.firstName || 'User'},</p>
    <p>Your order <strong>${order.projectName}</strong> (ID: ${order.id}) has been successfully booked!</p>
    <p>Total Amount: ₹${order.total}</p>
    <p>We will start processing it shortly.</p>
    <p>Thank you for choosing PCB Globe!</p>
  `
  return sendEmail(user.email, subject, html)
}

export const sendPaymentSuccessEmail = async (order: any, user: any, amount: number) => {
  const subject = `Payment Successful: ${order.projectName}`
  const html = `
    <h1>Payment Received</h1>
    <p>Hi ${user.firstName || 'User'},</p>
    <p>We have successfully received your payment of ₹${amount} for order <strong>${order.projectName}</strong>.</p>
    <p>Order Status: Payment Success</p>
    <p>Thank you!</p>
  `
  return sendEmail(user.email, subject, html)
}

export const sendShipmentEmail = async (order: any, user: any, trackingNumber: string, courier: string) => {
  const subject = `Order Shipped: ${order.projectName}`
  const html = `
    <h1>Your Order is on its way!</h1>
    <p>Hi ${user.firstName || 'User'},</p>
    <p>Your order <strong>${order.projectName}</strong> has been shipped.</p>
    <p><strong>Courier:</strong> ${courier}</p>
    <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
    <p>You can track your order using the info above.</p>
    <p>Thank you!</p>
  `
  return sendEmail(user.email, subject, html)
}
