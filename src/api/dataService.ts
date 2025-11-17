import type { DataFile } from "@/types";

export interface IDataFetcher {
  fetch(): Promise<DataFile>;
}

export class MockDataFetcher implements IDataFetcher {
  async fetch(): Promise<DataFile> {
    const url = new URL("../data/data.json", import.meta.url).href;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load mock data: ${res.status}`);
    return (await res.json()) as DataFile;
  }
}

export class EndpointDataFetcher implements IDataFetcher {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async fetch(): Promise<DataFile> {
    const res = await fetch(this.endpoint);
    if (!res.ok)
      throw new Error(
        `Failed to fetch endpoint ${this.endpoint}: ${res.status}`
      );
    return (await res.json()) as DataFile;
  }
}

export class DataService {
  private fetcher: IDataFetcher;

  constructor(fetcher: IDataFetcher) {
    this.fetcher = fetcher;
  }

  getData(): Promise<DataFile> {
    return this.fetcher.fetch();
  }
}

export default DataService;
