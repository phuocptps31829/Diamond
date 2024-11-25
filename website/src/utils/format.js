
import { format, formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatDateTimeLocale = (time, hasHourMinute = true) => {
    if (!time) return '';

    if (hasHourMinute) {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(time));
    }

    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(time));
};

export const formatPrice = (price) => {
    return price.toLocaleString() + '₫';
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);
};

export const formatWeekday = (date) => {
    return new Date(date).toLocaleString("vi-VN", {
        weekday: "long",
    });
};

export function formatPhoneNumber(phoneNumber) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return phoneNumber;
}

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export default function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} lúc ${hours}:${minutes}`;
}

export function formatRelativeDate(from) {
    const date = new Date(from);
    const currentDate = new Date();

    if (currentDate.getTime() - date.getTime() < 24 * 60 * 60 * 1000) {
        return formatDistanceToNowStrict(date, { addSuffix: true, locale: vi });
    } else {
        if (currentDate.getFullYear() === date.getFullYear()) {
            return format(date, 'MMM d', { locale: vi });
        } else {
            return format(date, 'MMM d, yyyy', { locale: vi });
        }
    }
}