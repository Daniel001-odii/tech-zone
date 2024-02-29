// dateUtils.js

export function formatToRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const elapsedMilliseconds = now - date;
  
    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;
  
    // Calculate the relative time
    if (elapsedMilliseconds < minute) {
      return 'a few seconds ago';
    } else if (elapsedMilliseconds < hour) {
      const minutes = Math.floor(elapsedMilliseconds / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsedMilliseconds < day) {
      const hours = Math.floor(elapsedMilliseconds / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (elapsedMilliseconds < week) {
      const days = Math.floor(elapsedMilliseconds / day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (elapsedMilliseconds < month) {
      const weeks = Math.floor(elapsedMilliseconds / week);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (elapsedMilliseconds < year) {
      const months = Math.floor(elapsedMilliseconds / month);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(elapsedMilliseconds / year);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
  