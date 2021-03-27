import React from "react";
import "components/Button.scss";
import getClassNames from "utils/getClassNames";

export enum ButtonColors {
  ColorStandard = "ColorStandard",
  ColorPrimary = "ColorPrimary",
  ColorSecondary = "ColorSecondary",
  ColorSuccess = "ColorSuccess",
  ColorInfo = "ColorInfo",
  ColorWarning = "ColorWarning",
  ColorDanger = "ColorDanger",
  ColorNeutral = "ColorNeutral",
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  primary?: boolean;
  small?: boolean;
  buttonTheme?: ButtonColors;
}

const Button = ({
  label,
  primary = false,
  small = false,
  buttonTheme,
  ...props
}: ButtonProps) => {

  const buttonClassNames = getClassNames({
    "button": true,
    "button--small": small,
    "button--primary": primary,
    "button--color-primary":
      buttonTheme === ButtonColors.ColorPrimary,
    "button--color-secondary":
      buttonTheme === ButtonColors.ColorSecondary,
    "button--color-success":
      buttonTheme === ButtonColors.ColorSuccess,
    "button--color-info": buttonTheme === ButtonColors.ColorInfo,
    "button--color-warning":
      buttonTheme === ButtonColors.ColorWarning,
    "button--color-danger": buttonTheme === ButtonColors.ColorDanger,
    "button--color-neutral":
      buttonTheme === ButtonColors.ColorNeutral,
  });

  return (
    <button {...props} className={buttonClassNames}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  buttonTheme: ButtonColors.ColorStandard,
};

export default Button;
