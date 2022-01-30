export type Modal = null|"swap-selection"|"swap-confirmation"|"liquidity-selection";

export interface ModalsState {
    shown: Modal;
}