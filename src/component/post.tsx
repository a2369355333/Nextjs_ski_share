import Image from "next/image";

interface PostProps {
  post?: Post;
}

const Post = ({ post }: PostProps) => {
  const { title = "--", content = "-", createdAt = 0, image } = post || {};

  return (
    <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
      <p className="text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </p>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="text-lg whitespace-pre-wrap">{content}</div>
      {image && (
        <div className="relative w-full my-3 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={`data:${image.mimeType};base64,${image.buffer}`}
            alt={title}
            width={image.width}
            height={image.height}
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Post;