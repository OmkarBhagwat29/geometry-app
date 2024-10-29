import { useEffect, useState } from "react";

const useCurrencyInfo = (currency: string) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((data) => setData(data[currency]));
  }, [currency]);
  return data;
};

export default useCurrencyInfo;
