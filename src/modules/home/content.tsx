  import Image from "next/image";
  import { Snowflake } from "lucide-react";
  import CommentBtn from "./comment-btn";
  import PostList from "./post-list";

  const INTRO_TEXT_LINE1 = [
    "A", "cozy", "place", "to", "share", "the", "moments", "that", "made",
    "your", "skating", "journey", "sparkle", "—", "the", "quiet", "mornings,",
    "the", "soft", "snow,", "the", "laughter,", "and", "the", "stories",
    "that", "linger", "in", "the", "cold", "air."
  ];

  const INTRO_TEXT_LINE2 = [
    "Write", "freely,", "drift", "gently,", "and", "let", "every",
    "memory", "glide", "with", "ease."
  ];

  const Content = () => {
    return (
      <div className="w-full max-w-[800px]">
         <Image
          src="/images/snow.jpg"
          className="w-full rounded-xl shadow-[0_10px_60px_rgba(153,246,228,0.4)]"
          width={800}
          height={400}
          alt="snow-banner"
        />

        <div className="flex flex-col justify-center items-center gap-5 my-5 py-5">
          <div className="flex items-center gap-3">
            <Snowflake className="w-8 h-8 text-rose-400 animate-spin-slow" />
            <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Skating Trip Share
            </h1>
            <Snowflake className="w-8 h-8 text-rose-400 animate-spin-slow" />
          </div>
          <div className="w-16 h-1 bg-linear-to-r from-transparent via-rose-300 to-transparent rounded-full" />
          <p className="text-center text-lg leading-relaxed text-rose-600 max-w-2xl">
            {INTRO_TEXT_LINE1.map((word, i) => (
              <span
                key={i}
                className="animate-float"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {word}&nbsp;
              </span>
            ))}
            <br />
            {INTRO_TEXT_LINE2.map((word, i) => (
              <span
                key={i}
                className="animate-float"
                style={{ animationDelay: `${(i + INTRO_TEXT_LINE1.length) * 0.1}s` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </p>
        </div>
        <CommentBtn />
        <PostList />
      </div>
    );
  };

  export default Content;