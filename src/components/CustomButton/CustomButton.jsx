import style from "./CustomButton.module.scss";
import classNames from "classnames";

export default function CustomButton({
  children,
  onClick,
  disabled,
  styles,
  ...props
}) {
  return (
    <button
      className={classNames(style.button, styles)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
