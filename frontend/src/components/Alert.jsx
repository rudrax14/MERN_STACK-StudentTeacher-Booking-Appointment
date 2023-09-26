// toastUtils.js
import { toast } from 'react-toastify';

const showToast = (message, type) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'warning') {
    toast.warning(message);
  }
  else if (type === 'error') {
    toast.error(message);
  }
  else if (type === 'info') {
    toast.info(message);
  }
  else {
    toast(message);
  }
};

export default showToast;
