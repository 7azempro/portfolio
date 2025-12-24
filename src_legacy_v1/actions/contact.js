'use server';

import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/messages.json');

export async function submitContactForm(formData) {
    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        date: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
    };

    // Simulate DB Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        // Read existing data
        let messages = [];
        if (fs.existsSync(DB_PATH)) {
            const fileContent = fs.readFileSync(DB_PATH, 'utf8');
            messages = JSON.parse(fileContent);
        }

        // Add new message
        messages.unshift(rawFormData);

        // Save back to file
        fs.writeFileSync(DB_PATH, JSON.stringify(messages, null, 2));

        // Attempt to send real email
        // We import dynamically to avoid build errors if nodemailer isn't perfect
        const { sendEmail } = await import('@/lib/email');
        await sendEmail({
            to: 'hazem.gamal1@outlook.com',
            subject: `New Portfolio Inquiry: ${rawFormData.name}`,
            text: `Name: ${rawFormData.name}\nEmail: ${rawFormData.email}\nMessage: ${rawFormData.message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${rawFormData.name}</p>
                <p><strong>Email:</strong> ${rawFormData.email}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f0f0f0; padding: 10px; border-left: 4px solid #333;">
                    ${rawFormData.message.replace(/\n/g, '<br>')}
                </blockquote>
            `
        });

        return { success: true, message: 'Message sent successfully!' };
    } catch (error) {
        console.error('Database Error:', error);
        return { success: false, message: 'Failed to send message.' };
    }
}
