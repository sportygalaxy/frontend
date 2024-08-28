import {ExternalToast, toast} from "sonner";

export const NotifyError = (message: string, data: ExternalToast = {}) => {
  const {style, ...rest} = data;
  toast.error(message, {
    style: {
      ...style,
      background: "#C70039",
      color: "whitesmoke",
    },
    ...rest,
  });
};

export const NotifySuccess = (message: string, data: ExternalToast = {}) => {
  const {style, ...rest} = data;
  toast.success(message, {
    style: {
      ...style,
      background: "#18dd81",
      color: "whitesmoke",
    },
    ...rest,
  });
};

export const NotifyInfo = (message: string, data: ExternalToast = {}) => {
  const {style, ...rest} = data;
  toast.info(message, {
    style: {
      ...style,
    },
    ...rest,
  });
};
