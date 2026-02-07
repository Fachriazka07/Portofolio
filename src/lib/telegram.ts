/**
 * Telegram Notification Service
 * Sends notifications to Telegram when new contact messages arrive
 */

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

interface ContactNotification {
    name: string;
    email: string;
    message: string;
}

/**
 * Send notification to Telegram
 */
export async function sendTelegramNotification(contact: ContactNotification): Promise<boolean> {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn('Telegram credentials not configured');
        return false;
    }

    const text = `
📩 *New Contact Message*

👤 *Name:* ${escapeMarkdown(contact.name)}
📧 *Email:* ${escapeMarkdown(contact.email)}

💬 *Message:*
${escapeMarkdown(contact.message)}

---
_Received at ${new Date().toLocaleString('id-ID')}_
  `.trim();

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown',
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error('Telegram API error:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
        return false;
    }
}

/**
 * Escape special characters for Telegram Markdown
 */
function escapeMarkdown(text: string): string {
    return text
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/`/g, '\\`');
}
