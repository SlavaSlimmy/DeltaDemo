import type { Category, Subcategory } from "@/types";
import clsx from "clsx";
import { formatDiff, formatNumber, percentDiff } from "@/helpers";

import styles from "./TableCell.module.scss";
import React from "react";

interface Props {
  item: Category | Subcategory;
  type?: "default" | "title" | "today" | "yesterday";
  isSubcategory?: boolean;
}

const TableCellInner = ({
  item,
  type = "default",
  isSubcategory = false,
}: Props) => {
  if (type === "title") {
    return (
      <td
        className={clsx(styles["cell"], styles["cell--title"], {
          [styles["cell--subcategory-item"]]: isSubcategory,
        })}
      >
        {item.category}
      </td>
    );
  }

  if (type === "today") {
    return (
      <td className={clsx(styles["cell"], styles["cell--today"])}>
        {formatNumber(item.data[0].value)}
      </td>
    );
  }

  if (type === "yesterday") {
    return (
      <td
        className={clsx(styles["cell"], {
          [styles["cell--positive"]]:
            percentDiff(item.data[0].value, item.data[1].value) > 0,
          [styles["cell--negative"]]:
            percentDiff(item.data[0].value, item.data[1].value) < 0,
        })}
      >
        {formatNumber(item.data[1].value)}
        <span
          className={clsx(styles["cell__percent"], {
            [styles["cell__percent--positive"]]:
              percentDiff(item.data[0].value, item.data[1].value) >= 0,
            [styles["cell__percent--negative"]]:
              percentDiff(item.data[0].value, item.data[1].value) < 0,
          })}
        >
          {formatDiff(item.data[0].value, item.data[1].value)}
        </span>
      </td>
    );
  }

  return (
    <td
      className={clsx(styles["cell"], {
        [styles["cell--positive"]]:
          percentDiff(item.data[0].value, item.data[2].value) > 0,
        [styles["cell--negative"]]:
          percentDiff(item.data[0].value, item.data[2].value) < 0,
      })}
    >
      {formatNumber(item.data[2].value)}
    </td>
  );
};

export const TableCell = React.memo(TableCellInner);
