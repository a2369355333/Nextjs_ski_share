import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Button,
  Field,
  Label,
  Input,
  Textarea,
} from "@headlessui/react";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addPost } from "@/service/post";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

interface CommentEditorProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

const CommentEditor = ({
  isDialogOpen,
  setIsDialogOpen,
}: CommentEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";
  const queryClient = useQueryClient();

  const { mutate: addPostMutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["posts", page, limit] });

      if (page !== "1") {
        router.push(`/?page=1&limit=${limit}`);
      }

      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview("");
      setImageDimensions(null);
    },
  });

  const onPost = () => {
    addPostMutate({ title, content, image, imageDimensions });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);

        // set image size
        const img = new window.Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = base64;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview("");
    setImageDimensions(null);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      transition
      className="fixed inset-0 w-screen flex justify-center items-center"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <DialogPanel className="w-full max-w-xl z-50 rounded-lg bg-white p-6 shadow-lg flex flex-col gap-3">
        <DialogTitle className="flex justify-center font-bold text-xl sm:text-2xl">
          What's your favorate memory?
        </DialogTitle>
        {/* Title */}
        <Field>
          <Label className="text-sm text-gray-600">Title</Label>
          <Input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </Field>
        {/* Content */}
        <Field>
          <Label className="text-sm text-gray-600">Content</Label>
          <Textarea
            className="w-full min-h-[100px] p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
        </Field>
        {/* Image Preview */}
        <div className="flex justify-center items-center">
          <div className="w-full max-h-80 sm:max-h-100 border-2 border-dashed border-gray-300 rounded-lg overflow-y-auto bg-gray-50">
            {imagePreview && imageDimensions ? (
              <div className="w-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  style={{ width: '100%', height: 'auto' }}
                  unoptimized
                />
              </div>
            ) : (
              <div className="text-center text-gray-400 py-20">
                <ImagePlus className="mx-auto h-12 w-12 text-gray-300" />
                <p className="text-sm mt-2">No image selected</p>
              </div>
            )}
          </div>
        </div>
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Button
            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
            onClick={handleImageClick}
          >
            <ImagePlus className="w-8 h-8" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              className={`px-4 py-2 text-white rounded-lg cursor-pointer
                ${
                  isPending || !title || !content
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              onClick={onPost}
              disabled={isPending || !title || !content}
            >
              Submit
            </Button>
            <Button
              className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg cursor-pointer"
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommentEditor;