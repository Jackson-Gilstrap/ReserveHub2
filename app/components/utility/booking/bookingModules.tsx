'use client';
import NavButton from "../button";

interface ModuleProps {
    title:string;
    text:string;
    url:string
}

export default function BookingModule({title, text, url}:ModuleProps) {
    return (
        <div className="border-2 border-[#E0E0E0] px-4 py-6 bg-[#FDFDFD] rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.05)] mt-8 mx-6">
            <h2 className="text-xl font-semibold text-[#212529]">{title}</h2>
            <p className="mt-2 text-[#6C757D]">
              {text}
            </p>
            <NavButton url={url} text="Go" disabled={false}/>
          </div>
    )
}



