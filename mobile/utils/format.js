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