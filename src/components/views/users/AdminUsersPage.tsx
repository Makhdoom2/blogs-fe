"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import styles from "./user.module.css";
import { useAdmin } from "@/api/hooks/useAdmin";
import Table, { Column } from "@/components/ui/table/Table";
import Toggle from "@/components/ui/toggle/Toggle";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/select/Select";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [blockedFilter, setBlockedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { useGetUsers, toggleUserBlock } = useAdmin();

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const isBlocked =
    blockedFilter === "all"
      ? undefined
      : blockedFilter === "blocked"
      ? true
      : false;

  const { data, isLoading, refetch } = useGetUsers({
    page,
    limit,
    search: debouncedSearch || undefined,
    role: roleFilter === "all" ? undefined : roleFilter,
    isBlocked,
  });

  useEffect(() => {
    refetch();
  }, [page, limit, debouncedSearch, roleFilter, blockedFilter]);

  const handleToggleBlock = (userId: string) => {
    toggleUserBlock.mutate({ id: userId }, { onSuccess: () => refetch() });
  };

  const columns: Column<any>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },

    {
      key: "status",
      header: "Status",

      render: (_, row) => (
        <div className={styles.statusColumn}>
          <span
            className={`${styles.statusPill} ${
              row.isBlocked ? styles.statusBlocked : styles.statusActive
            }`}
          >
            {row.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      ),
    },

    {
      key: "createdAt",
      header: "Created At",
      sortable: true,
      render: (value) =>
        value
          ? new Date(value).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "-",
    },

    {
      key: "action",
      header: "Action",
      render: (_, row) => (
        <Toggle
          checked={row.isBlocked}
          onChange={() => handleToggleBlock(row._id)}
        />
      ),
    },
  ];

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages.map((p, idx) =>
      p === "..." ? (
        <span key={idx} style={{ padding: "0.5rem" }}>
          ...
        </span>
      ) : (
        <button
          key={idx}
          className={`${styles.pageButton} ${page === p ? styles.active : ""}`}
          onClick={() => setPage(Number(p))}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <div className={styles.searchField}>
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.smallSelect}>
            <Select
              placeholder="Filter by role"
              value={roleFilter}
              onChange={(value) => {
                setRoleFilter(value);
                setPage(1);
              }}
              options={["all", "user", "admin"]}
            />
          </div>

          <div className={styles.smallSelect}>
            <Select
              placeholder="Filter by status"
              value={blockedFilter}
              onChange={(value) => {
                setBlockedFilter(value);
                setPage(1);
              }}
              options={["all", "blocked", "unblocked"]}
            />
          </div>
        </div>
      </div>

      <Table
        data={data?.users || []}
        columns={columns}
        loading={isLoading}
        emptyMessage="No users found."
      />

      <div className={styles.pagination}>
        <button
          className={`${styles.pageButton} ${page <= 1 ? styles.disabled : ""}`}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        {renderPagination()}
        <button
          className={`${styles.pageButton} ${
            page >= totalPages ? styles.disabled : ""
          }`}
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
