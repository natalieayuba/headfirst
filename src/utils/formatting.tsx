export const appendClassName = (className: string | undefined) =>
  className ? ` ${className}` : '';

export const getUrlFromHeading = (heading: string) =>
  heading.toLowerCase().replace('&', 'and').replace(/ /g, '-');
