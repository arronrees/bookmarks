export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getFavicon(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain=${parsedUrl.hostname}`;
  } catch (error) {
    console.error('Invalid URL', error);
    return '';
  }
}
