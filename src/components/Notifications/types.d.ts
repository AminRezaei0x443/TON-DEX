export type ToastProps = {
    message: string;
    type?: "normal"|"success"|"failure";
    onClick?: () => void;
}