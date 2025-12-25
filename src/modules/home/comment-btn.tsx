"use client";

import { useState } from "react";
import { Button } from "@headlessui/react";
import { PenLine, Sparkles } from "lucide-react";
import CommentEditor from "./comment-editor";

const CommentBtn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex justify-center items-center mb-12">
      <Button
        onClick={() => setIsDialogOpen(true)}
        className={`
          flex items-center gap-3 group relative px-8 py-4 rounded-full cursor-pointer
          bg-linear-to-r from-pink-400 to-rose-400 text-white text-lg font-semibold 
          hover:from-pink-500 hover:to-rose-500 transition-all duration-300 
          shadow-[0_8px_30px_rgba(251,113,133,0.4)] 
          hover:shadow-[0_12px_40px_rgba(251,113,133,0.6)] hover:scale-105
        `}
      >
        <PenLine className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span>Share a Memorable Story</span>
        <Sparkles className="w-5 h-5 animate-pulse group-hover:animate-spin" />
      </Button>
      <CommentEditor
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default CommentBtn;
