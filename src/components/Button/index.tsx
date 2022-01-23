import React from 'react';
import styles from './index.module.scss';

type Props =
React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
>
& { title:string };

/* eslint-disable react/jsx-props-no-spreading */
function Button({title, ...props}:Props) {
  return <button
    className={styles.button}
    type="button" {...props}>{title}</button>;
}
export default Button