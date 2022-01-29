import React from "react";
import { Range } from "react-range";
import styles from "./index.module.scss";


interface IProps {
  value: number;
  onChange?: (value: number) => void;
}

export default function PercentageSelector({ value, onChange }:IProps) {
  return <div className={styles.container}>
    <Range
      step={0.1}
      min={0}
      max={100}
      values={[value]}
      onChange={(values) => !!onChange && onChange(values[0])}
      renderTrack={({ props, children }) => {
        const percent = (children as any[])[0]?.props["aria-valuenow"] as number ?? 0;

        return (
          <div
            {...props}
            style={{
              ...props.style,
            }}
            className={styles.track}
          >
            <div className={styles.trackFilled}
              style={{
                right: `${100-percent}%`
              }}/>
            {children}
          </div>
        );
      }}
      renderThumb={({ props }) => (
        <div
          {...props}
          className={styles.thumb}
        />
      )}
    />
  </div>;
}
