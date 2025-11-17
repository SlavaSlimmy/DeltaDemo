import { DataTable, Header } from "@/components";
import { useGetData } from "@/hooks/useGetData";

import styles from "./App.module.scss";

function App() {
  const { data } = useGetData();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <DataTable data={data} />
      </main>
    </>
  );
}

export default App;
