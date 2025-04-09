export function parseDate(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
}

export function formatDate(date) {
    return date.toISOString().slice(5, 10); // "MM-DD"
}

export function offset(dateStr) {
    const base = new Date("2025-01-01"); // data base para cálculo
    const current = new Date(dateStr);
    const diff = (current - base) / (1000 * 60 * 60 * 24); // diferença em dias
    return diff * 30; // 30px por dia
}