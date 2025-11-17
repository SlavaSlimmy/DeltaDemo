import { useMemo } from "react";
import type { DataPoint } from "@/types";
import { Chart, Legend, Series, XAxis } from "@highcharts/react";

import styles from "./RowDetails.module.scss";

interface Props {
  id?: number;
  title: string;
  data: DataPoint[];
}

export const RowDetails = ({ id, title, data }: Props) => {
  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      const [d1, m1, y1] = a.date.split("/").map(Number);
      const [d2, m2, y2] = b.date.split("/").map(Number);
      return (
        new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime()
      );
    });
  }, [data]);

  const categories = useMemo(() => sortedData.map((d) => d.date), [sortedData]);
  const seriesData = useMemo(
    () => sortedData.map((d) => d.value),
    [sortedData]
  );

  return (
    <tr key={id ? `details-${id}` : undefined}>
      <td colSpan={4}>
        <div
          className={styles.chart}
          role="img"
          aria-label={`График: ${title}`}
        >
          <Chart>
            <XAxis categories={categories} />
            <Series type="line" data={seriesData} options={{ name: title }} />
            <Legend enabled={false} />
          </Chart>
        </div>
      </td>
    </tr>
  );
};
