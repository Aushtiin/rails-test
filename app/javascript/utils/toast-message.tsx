import * as React from "react";
import { ToastMessage } from "../components/shared/toaster";
import { toast } from "react-toastify";
import { ToastMessageConstants } from "../constants/toast-types";
import { baseTheme } from "../themes/base";

export const showToast = (message, variant) => {
  const heading = `${variant.charAt(0)}${variant.slice(1).toLowerCase()}`;
  switch (variant) {
    case ToastMessageConstants.SUCCESS:
      toast(
        <ToastMessage
          heading={heading}
          message={message}
          color={baseTheme.colors.finePine}
          iconName={"Success-PO"}
        />,
      );
      break;
    case ToastMessageConstants.INFO:
      toast(
        <ToastMessage
          heading={heading}
          message={message}
          color={baseTheme.colors.fuschiaBlue}
          iconName={"Info-PO"}
        />,
      );
      break;
    case ToastMessageConstants.WARNING:
      toast(
        <ToastMessage
          heading={heading}
          message={message}
          color={baseTheme.colors.cautionYellow}
          iconName={"Warning-PO"}
        />,
      );
      break;
    case ToastMessageConstants.ERROR:
      toast(
        <ToastMessage
          heading={heading}
          message={message}
          color={baseTheme.colors.warningRed}
          iconName={"Error-PO"}
        />,
      );
      break;
    default:
      toast(
        <ToastMessage
          heading={"Notification"}
          message={message}
          color={baseTheme.colors.primary100}
          iconName={"Notification-PO"}
        />,
      );
  }
};
