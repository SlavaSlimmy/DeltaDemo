import clsx from "clsx";
import React, { useCallback, useState } from "react";
import type { DataFile } from "@/types";
import { RowDetails, TableCell } from "@/components";

import styles from "./DataTable.module.scss";

interface Props {
  className?: string;
  data: DataFile;
}

export const DataTable = ({ className, data }: Props) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = useCallback((key: number) => {
    setExpanded((prev) => (prev === key ? null : key));
  }, []);

  return (
    <div className={styles["table-responsive"]}>
      <table className={clsx(className, styles["data-table"])}>
        <thead>
          <tr>
            <th className={styles["data-table__cell"]}>Показатель</th>
            <th
              className={clsx(
                styles["data-table__cell"],
                styles["data-table__cell--today"]
              )}
            >
              Текущий день
            </th>
            <th className={styles["data-table__cell"]}>Вчера</th>
            <th className={styles["data-table__cell"]}>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr
                className={styles["data-table__row"]}
                onClick={() => toggle(item.id)}
              >
                <TableCell type="title" item={item} />
                <TableCell type="today" item={item} />
                <TableCell type="yesterday" item={item} />
                <TableCell item={item} />
              </tr>
              {expanded === item.id && (
                <RowDetails
                  id={item.id}
                  title={item.category}
                  data={item.data}
                />
              )}

              {item.subcategories?.map((sub) => (
                <React.Fragment key={sub.id}>
                  <tr
                    className={styles["data-table__row"]}
                    onClick={() => toggle(sub.id)}
                  >
                    <TableCell type="title" item={sub} isSubcategory />
                    <TableCell type="today" item={sub} />
                    <TableCell type="yesterday" item={sub} />
                    <TableCell item={sub} />
                  </tr>
                  {expanded === sub.id && (
                    <RowDetails
                      id={sub.id}
                      title={sub.category}
                      data={sub.data}
                    />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
