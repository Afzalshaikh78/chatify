import { ENV } from '../lib/env.js'; // Adjust path

const welcomeEmailTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Chatify</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 10px;
            }
            .welcome-text {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">💬 ${ENV.EMAIL_FROM_NAME}</div>
                <h1 class="welcome-text">Welcome aboard, ${userName}! 🎉</h1>
            </div>
            
            <div class="content">
                <p>We're thrilled to have you join our amazing community!</p>
                
                <p>Here's what you can do with ${ENV.EMAIL_FROM_NAME}:</p>
                <ul>
                    <li>🚀 Start real-time conversations instantly</li>
                    <li>📱 Send messages in real-time</li>
                    <li>🔔 Get notifications when friends are online</li>
                    <li>🎨 Enjoy our beautiful interface</li>
                    <li>🖼️ Share images with friends</li>
                </ul>
                
                <p>Ready to start chatting?</p>
                <a href="${
                  ENV.CLIENT_URL || "http://localhost:5173"
                }" class="button">Start Chatting Now</a>
            </div>
            
            <div class="footer">
                <p>Thanks for joining us!</p>
                <p>The ${ENV.EMAIL_FROM_NAME} Team</p>
                <p><small>Sent securely via Brevo</small></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default welcomeEmailTemplate;
