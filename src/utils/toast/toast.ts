import { toast, ToastOptions } from "react-hot-toast";
import styles from "./toast.module.css";

const defaultOptions: ToastOptions = {
  duration: 4000,
  position: "top-right",
  className: styles.toastBase,
};

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    ...defaultOptions,
    className: `${styles.toastBase} ${styles.toastSuccess}`,
    ...options,
  });
};

export const toastError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    ...defaultOptions,
    className: `${styles.toastBase} ${styles.toastError}`,
    ...options,
  });
};

export const toastLoading = (message: string, options?: ToastOptions) => {
  return toast.loading(message, {
    ...defaultOptions,
    className: `${styles.toastBase} ${styles.toastLoading}`,
    ...options,
  });
};

export const toastPromise = <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string },
  options?: ToastOptions
) => {
  return toast.promise(promise, messages, {
    ...defaultOptions,
    className: styles.toastBase,
    loading: {
      ...options,
      className: `${styles.toastBase} ${styles.toastLoading}`,
    },
    success: {
      ...options,
      className: `${styles.toastBase} ${styles.toastSuccess}`,
    },
    error: {
      ...options,
      className: `${styles.toastBase} ${styles.toastError}`,
    },
    ...options,
  });
};
