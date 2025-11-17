import clsx from "clsx";
import type { FC } from "react";

import styles from "./Header.module.scss";

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return (
    <header className={clsx(className, styles.header)}>
      <h1 className={styles.header__title}>Delta demo</h1>
    </header>
  );
};
