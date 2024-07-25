import React, { useEffect, useState } from "react";
import IconSearch from "@assets/IconSearch.svg";

import * as styles from "./Filter.module.css";

interface FilterProps<T> {
  data: T[];
  byFields: (keyof T)[];
  onDataFiltered: (data: T[]) => void;
}

const COUNT_FILTER_INITIAL = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Filter = <T extends Record<string, any>>({ data, byFields, onDataFiltered }: FilterProps<T>) => {
  const [numberFilter, setnumberFilter] = useState(COUNT_FILTER_INITIAL);

  useEffect(() => {
    setnumberFilter(data.length);
  }, [data.length]);

  const handleFilter = (valueFilter: string) => {
    const resultFilter = data.filter((dataItem) =>
      byFields.some((byField) => dataItem[byField].toLowerCase().includes(valueFilter.toLowerCase())),
    );
    if (valueFilter.length) {
      setnumberFilter(resultFilter.length);
      onDataFiltered(resultFilter);
    } else {
      setnumberFilter(data.length);
      onDataFiltered(data);
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__top}>
        <img className={styles.filter__icon} src={IconSearch} />
        <input
          type='text'
          className={styles.filter__sarch}
          placeholder='SEARCH A CHARACTER...'
          onChange={(event) => handleFilter(event.target.value)}
        />
      </div>
      <span key={data.length} className={styles["filter__result-count"]}>
        {numberFilter} {numberFilter === 1 ? "RESULT" : "RESULTS"}
      </span>
    </div>
  );
};

export default Filter;
