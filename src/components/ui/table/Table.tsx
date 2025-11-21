import React, { useState, useMemo } from "react";
import styles from "./table.module.css";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

const Table = <T,>({
  data,
  columns,
  loading = false,
  emptyMessage = "No data available",
  className = "",
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: "", direction: null });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    setSortConfig((current) => {
      if (current.key !== key) {
        return { key, direction: "asc" };
      }

      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }

      return { key: "", direction: null };
    });
  };

  if (loading) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          Loading data...
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📊</div>
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.headerCell}
                onClick={() => handleSort(column.key, column.sortable)}
                style={{ width: column.width }}
              >
                <div className={styles.headerContent}>
                  <span>{column.header}</span>
                  {column.sortable && (
                    <div className={styles.sortContainer}>
                      <span
                        className={`${styles.sortIcon} ${styles.up} ${
                          sortConfig.key === column.key &&
                          sortConfig.direction === "asc"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        ↑
                      </span>
                      <span
                        className={`${styles.sortIcon} ${styles.down} ${
                          sortConfig.key === column.key &&
                          sortConfig.direction === "desc"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        ↓
                      </span>
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {sortedData.map((row, index) => (
            <tr key={index} className={styles.tableRow}>
              {columns.map((column) => (
                <td key={column.key} className={styles.tableCell}>
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : String(row[column.key as keyof T] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
