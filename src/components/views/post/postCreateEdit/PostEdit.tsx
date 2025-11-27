"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import styles from "./createPost.module.css";
import Input from "@/components/ui/Input/Input";
import RichTextEditor from "@/components/ui/editor/RichTextEditor";
import Button from "@/components/ui/button/Button";
import { usePosts } from "@/api/hooks/usePosts";
import { CreatePostSchema } from "@/api/types/validators";
import { FaArrowLeft } from "react-icons/fa";

export default function EditPostScreen() {
  const router = useRouter();
  const { id } = useParams();
  const { useGetPost, updatePost } = usePosts();

  const { data: postData, isLoading } = useGetPost(id as string);

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

  // prefill form once postData is loaded
  useEffect(() => {
    if (postData) {
      reset({
        title: postData.title || "",
        contentHTML: postData.contentHTML || "",
        imageUrl: postData.imageUrl || "",
      });
      setContentHTML(postData.contentHTML || "");
      setImagePreview(postData.imageUrl || undefined);
      setValue("contentHTML", postData.contentHTML || "");
    }
  }, [postData, reset, setValue]);

  const { mutate: updateMutate, isPending } = updatePost;

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      contentHTML,
      imageUrl: imagePreview,
    };

    updateMutate(
      { id: id as string, data: payload },
      {
        onSuccess: () => {
          router.push(`/posts/${id}`);
        },
      }
    );
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

  if (isLoading) return <div>Loading post data...</div>;

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
        <h2 className={styles.title}>Edit Post</h2>

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
              //   key={contentHTML}
              content={contentHTML}
              setContent={(html) => {
                setContentHTML(html);
                setValue("contentHTML", html, { shouldValidate: true });
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
              placeholder="Select image"
            />
            {imagePreview && (
              <div className={styles.previewWrapper}>
                <p className={styles.previewTitle}>Thumbnail Preview</p>
                <img
                  src={imagePreview}
                  className={styles.preview}
                  alt="preview"
                />
              </div>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Post"}
          </Button>
        </form>
      </div>
    </>
  );
}
