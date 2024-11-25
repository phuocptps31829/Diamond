import { format, formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

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