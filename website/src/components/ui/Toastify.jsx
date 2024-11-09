import { toast } from "react-toastify";

const options = {
  position: 'top-right',
  closeOnClick: true,
  pauseOnHover: false,
  toastId: 'id-t'
};

export const toastUI = (message, type) => {
  if (type === 'success') {
    toast.success(message, options);
  }

  if (type === 'error') {
    toast.error(message, options);
  }

  if (type === 'warning') {
    toast.warning(message, options);
  }
};
