export default function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.startsWith('998') && cleaned.length === 12) {
        return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
    }

    return phoneNumber;
}