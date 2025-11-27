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
    if (!sortConfig.key || !sortConfig.direction || loading) return data;

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
  }, [data, sortConfig, loading]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable || loading) return;

    setSortConfig((current) => {
      if (current.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return { key: "", direction: null };
    });
  };

  const skeletonRows = Array.from({ length: 8 }); // 8 skeleton rows

  return (
    <div className={`${styles.tableWrapper}`}>
      <div className={`${styles.tableContainer} ${className}`}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={styles.headerCell}
                  onClick={() => handleSort(column.key, column.sortable)}
                >
                  <div className={styles.headerContent}>
                    <span>{column.header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {loading ? (
              skeletonRows.map((_, i) => (
                <tr key={i} className={styles.tableRow}>
                  {columns.map((col) => (
                    <td key={col.key} className={styles.tableCell}>
                      <div className={styles.skeleton} />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length > 0 ? (
              sortedData.map((row, i) => (
                <tr key={i} className={styles.tableRow}>
                  {columns.map((col) => (
                    <td key={col.key} className={styles.tableCell}>
                      {col.render
                        ? col.render(row[col.key as keyof T], row)
                        : String(row[col.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
