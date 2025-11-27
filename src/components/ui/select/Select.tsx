"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./select.module.css";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  issmall?: boolean;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  issmall = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, option?: string) => {
    switch (e.key) {
      case "Enter":
      case " ":
        if (option) {
          handleSelect(option);
        } else {
          setIsOpen(!isOpen);
        }
        e.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        if (!isOpen) setIsOpen(true);
        e.preventDefault();
        break;
      case "ArrowUp":
        if (!isOpen) setIsOpen(true);
        e.preventDefault();
        break;
    }
  };

  return (
    <div
      className={styles.customSelect}
      ref={dropdownRef}
      style={{
        width: issmall ? "fit-content" : undefined,
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          width: issmall ? "fit-content" : undefined,
          maxWidth: "100%",
          height: issmall ? "32px" : undefined,
          fontSize: issmall ? "0.9rem" : undefined,
          padding: issmall ? "6px 12px" : undefined,
          borderRadius: issmall ? "6px" : undefined,
        }}
        className={styles.selectHeader}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{value || placeholder || "Select an option"}</span>

        {/* {!issmall && ( */}
        <span
          className={`${styles.arrow} ${
            isOpen ? styles.arrowUp : styles.arrowDown
          }`}
          style={{ marginLeft: issmall ? "10px" : undefined }}
        ></span>
        {/* )} */}
      </div>

      {isOpen && (
        <div
          className={styles.selectList}
          role="listbox"
          aria-label="Select an option"
        >
          {options.map((option, idx) => (
            <div
              key={idx}
              className={`${styles.selectItem} ${
                value === option ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              tabIndex={0}
              role="option"
              aria-selected={value === option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
