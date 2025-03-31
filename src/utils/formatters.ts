export function formatPhoneNumber(phone: string): string {
    if (phone.length !== 10) return phone;
    const area = phone.slice(0, 3);
    const middle = phone.slice(3, 6);
    const last = phone.slice(6);
    return `(${area}) ${middle}-${last}`;
  }