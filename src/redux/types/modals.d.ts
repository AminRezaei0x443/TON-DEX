export type Modal = null|
                    "swap-selection"|
                    "swap-confirmation"|
                    "liquidity-selection"|
                    "confirm-supply"|
                    "confirm-remove"|
                    "swap-settings";

export interface ModalsState {
    shown: Modal;
}