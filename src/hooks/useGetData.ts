import { useEffect, useState } from "react";
import type { DataFile } from "@/types";
import {
  DataService,
  MockDataFetcher,
  EndpointDataFetcher,
  type IDataFetcher,
} from "@/api/dataService";

interface GetDataOptions {
  useMock?: boolean;
  endpoint?: string;
}

export function useGetData(options?: GetDataOptions) {
  const [data, setData] = useState<DataFile>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useMock = options?.useMock ?? true;
    const fetcher: IDataFetcher = useMock
      ? new MockDataFetcher()
      : new EndpointDataFetcher(options?.endpoint ?? "");

    const service = new DataService(fetcher);

    service
      .getData()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
      })
      .finally(() => setLoading(false));
  }, [options?.useMock, options?.endpoint]);

  return { data, loading };
}
