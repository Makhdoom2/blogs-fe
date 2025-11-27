"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./createPost.module.css";
import { CreatePostSchema } from "@/api/types/validators";
import Input from "@/components/ui/Input/Input";
import RichTextEditor from "@/components/ui/editor/RichTextEditor";
import Button from "@/components/ui/button/Button";
import { usePosts } from "@/api/hooks/usePosts";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CreatePostScreen() {
  const { createPost } = usePosts();
  const router = useRouter();
  const [contentHTML, setContentHTML] = useState("");
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      contentHTML: "",
      imageUrl: "",
    },
  });

  const { mutate, isPending } = createPost;
  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      contentHTML,
      imageUrl: imagePreview,
    };

    mutate(payload, {
      onSuccess: () => {
        // reset form and local states
        reset();
        setContentHTML("");
        setImagePreview(undefined);
        setValue("contentHTML", "");
        router.push("/posts");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/posts");
    }
  };
  return (
    <>
      <button className={styles.backButton} onClick={handleBack}>
        <FaArrowLeft /> Back
      </button>

      <div className={styles.container}>
        <h2 className={styles.title}>Create New Post</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <Input placeholder="Enter title" register={register("title")} />
            {errors.title && (
              <p className={styles.error}>{errors.title.message as string}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Content</label>
            <RichTextEditor
              content={contentHTML}
              setContent={(html) => {
                setContentHTML(html); // update local state
                setValue("contentHTML", html, { shouldValidate: true }); // update RHF
              }}
            />
            {errors.contentHTML && (
              <p className={styles.error}>
                {errors.contentHTML.message as string}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Thumbnail Image</label>
            <Input
              type="file"
              onChange={handleImageChange}
              placeholder="select image"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                className={styles.preview}
                alt="preview"
              />
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </div>
    </>
  );
}
