import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./blogSlider.module.css";

interface BlogPost {
  _id: string;
  title: string;
  imageUrl?: string;
  authorName: string;
}

interface BlogSliderProps {
  posts: BlogPost[];
}

const BlogSlider: FC<BlogSliderProps> = ({ posts }) => {
  if (posts.length === 0) return null;

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
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <div className={styles.card}>
              <img
                src={
                  post.imageUrl ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={post.title}
                className={styles.image}
              />
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.author}>By {post.authorName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BlogSlider;
