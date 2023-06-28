// export const isProd = process.env.NODE_ENV === 'development';
// export const isLocal = process.env.NODE_ENV === 'production';
export const isProd = false;
export const isLocal = true;

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;
