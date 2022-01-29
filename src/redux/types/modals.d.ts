export type Modal = null|"swap-selection"|"swap-confirmation";

export interface ModalsState {
    shown: Modal;
}