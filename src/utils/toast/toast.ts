import { toast, ToastOptions } from "react-hot-toast";

const defaultOptions: ToastOptions = {
  duration: 4000,
  position: "top-right",
  style: {
    borderRadius: "8px",
    padding: "12px 16px",
    fontWeight: 500,
    fontSize: "14px",
  },
};

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const toastError = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const toastLoading = (message: string, options?: ToastOptions) => {
  return toast.loading(message, { ...defaultOptions, ...options });
};

export const toastPromise = <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string },
  options?: ToastOptions
) => {
  return toast.promise(promise, messages, { ...defaultOptions, ...options });
};
