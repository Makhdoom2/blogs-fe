"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import Heading from "@tiptap/extension-heading";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";

import styles from "./richtext.module.css";
import ImageModal from "./ImageModal";
import Select from "../select/Select";

interface RichTextEditorProps {
  content: string;
  setContent: (html: string) => void;
}

export default function RichTextEditor({
  content,
  setContent,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      TextStyle,
      Color,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      BulletList,
      OrderedList,
      ListItem,
      Heading,
      Strike,
      Highlight,
    ],

    content: content || "<p></p>",
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
    immediatelyRender: false,
  });

  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("");

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor)
    return <div className={styles.editorWrapper}>Loading editor...</div>;

  return (
    <div className={styles.editorWrapper}>
      {/* toolbar */}
      {/* <div className={styles.toolbar}>
        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("bold") ? styles.activeButton : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("italic") ? styles.activeButton : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("strike") ? styles.activeButton : ""
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("heading", { level: 2 }) ? styles.activeButton : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("bulletList") ? styles.activeButton : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          UL
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("orderedList") ? styles.activeButton : ""
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          OL
        </button>
      </div> */}
      <div className={styles.toolbar}>
        {/* TEXT FORMATTING */}
        <button
          type="button"
          className={editor.isActive("bold") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={editor.isActive("strike") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </button>
        <button
          type="button"
          className={editor.isActive("highlight") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          Highlight
        </button>
        <button
          type="button"
          className={editor.isActive("code") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          Code
        </button>

        {/* HEADINGS */}
        <Select
          issmall={true}
          value={currentHeading}
          placeholder="Heading"
          options={["H1", "H2", "H3", "H4", "H5", "H6"]}
          onChange={(option) => {
            // Convert H1-H6 to level number
            const level = parseInt(option.replace("H", "")) as
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6;
            editor.chain().focus().toggleHeading({ level }).run();
            setCurrentHeading(option); // update selected heading in state
          }}
        />

        {/* LISTS */}
        <button
          type="button"
          className={editor.isActive("bulletList") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          UL
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? styles.active : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          OL
        </button>

        {/* LINKS */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Unlink
        </button>

        {/* IMAGE */}
        <button type="button" onClick={() => setImageModalOpen(true)}>
          Image
        </button>

        {/* TABLES */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
        >
          Table
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          +Row
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          +Col
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteRow().run()}
        >
          -Row
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteColumn().run()}
        >
          -Col
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          Delete Table
        </button>

        {/* TEXT COLOR */}
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
      </div>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onSubmit={(url) => {
          editor.chain().focus().setImage({ src: url }).run();
          setImageModalOpen(false);
        }}
      />
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
