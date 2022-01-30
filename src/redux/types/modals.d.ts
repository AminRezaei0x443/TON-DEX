export type Modal = null|"swap-selection"|"swap-confirmation"|"liquidity-selection"|"confirm-supply";

export interface ModalsState {
    shown: Modal;
}