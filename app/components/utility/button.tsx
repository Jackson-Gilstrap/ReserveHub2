"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface NavButtonProps {
  url: string;
  text: string;
  disabled: boolean;
  
}

const NavButton: FC<NavButtonProps> = ({ url, text, disabled }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          onClick={() => router.push(`/${url}`)}
          className={`bg-blue-500 text-gray-800 font-bold px-4 py-2  border-2 rounded-sm shadow-lg mt-8 cursor-pointer disabled:bg-slate-200 `}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    </>
  );
};

export default NavButton;
