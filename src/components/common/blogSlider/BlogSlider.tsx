"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./blogSlider.module.css";
import { usePosts } from "@/api/hooks/usePosts";
import { Post } from "@/api/types";
import { useRouter } from "next/navigation";

const SkeletonCard = () => (
  <div className={`${styles.card} ${styles.skeleton}`}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonTitle}></div>
    <div className={styles.skeletonAuthor}></div>
  </div>
);

const BlogSlider: FC = () => {
  const { useGetPosts } = usePosts();

  const router = useRouter();

  const { data, isLoading } = useGetPosts(1, 10, "");

  const posts: Post[] = data?.posts || [];

  return (
    <section className={styles.blogSliderSection}>
      <h2 className={styles.heading}>
        Latest <span className="text-gradient">Blogs</span>
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        loop={true}
        // navigation={window.innerWidth > 768 ? true : false}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <SkeletonCard />
              </SwiperSlide>
            ))
          : posts.map((post) => (
              <SwiperSlide key={post._id}>
                <div
                  className={styles.card}
                  onClick={() => router.push(`/posts/${post._id}`)}
                >
                  <img
                    src={
                      post.imageUrl ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={post.title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.author}>By {post.author.name}</p>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default BlogSlider;
