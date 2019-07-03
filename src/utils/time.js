export const dateFormatter = (timestamp) => {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  const hh = d.getHours();
  let h = hh;
  let m = d.getMinutes();
  let dd = 'AM';
  m = m < 10 ? `0${m}` : m;

  if (h >= 12) {
    h = hh - 12;
    dd = 'PM';
  }
  if (h == 0) {
    h = 12;
  }
  // const dateFormat = d && `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${h}:${m}${dd}`;
  const dateFormat = d && `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  return dateFormat;
};

export const timeSince = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const dateFormat = d && `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  const seconds = Math.floor(((new Date().getTime() / 1000) - date / 1000));

  let interval = Math.floor(seconds / 86400);

  if (interval > 1) {
    return dateFormat;
  }

  const hh = d.getHours();
  let h = hh;
  let m = d.getMinutes();
  let dd = 'AM';
  m = m < 10 ? `0${m}` : m;

  if (h >= 12) {
    h = hh - 12;
    dd = 'PM';
  }
  if (h == 0) {
    h = 12;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${h}:${m}${dd}`;
  if (interval === 1) return `${h}:${m}${dd}`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${h}:${m}${dd}`;
  if (interval === 1) return `${h}:${m}${dd}`;

  return `${h}:${m}${dd}`;

  // if (interval > 1) return `${interval} days ago at ${h}:${m}${dd}`;
  // if (interval === 1) return `${interval} day ago at ${h}:${m}${dd}`;

  // interval = Math.floor(seconds / 3600);
  // if (interval > 1) return `${interval} hours ago at ${h}:${m}${dd}`;
  // if (interval === 1) return `${interval} hour ago at ${h}:${m}${dd}`;

  // interval = Math.floor(seconds / 60);
  // if (interval > 1) return `${interval} minutes ago at ${h}:${m}${dd}`;
  // if (interval === 1) return `${interval} minute ago at ${h}:${m}${dd}`;

  // return `${Math.floor(seconds)} seconds ago at ${h}:${m}${dd}`;
};

// let interval = Math.floor(seconds / 31536000);
// if (interval > 1) return `${interval} years ago`;
// if (interval === 1) return `${interval} year ago`;

// interval = Math.floor(seconds / 2592000);
// if (interval > 1) return `${interval} months ago`;
// if (interval === 1) return `${interval} month ago`;
