import { useState } from "react";

type Props = {
  images: string[];
};

export default function ProductImageGallery({ images }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="flex h-96 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt=""
          className="max-h-full max-w-full  object-cover"
        />
      </div>

      {/* المصغّرات */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-16 w-16 overflow-hidden rounded-lg border bg-white p-1 transition ${
              i === active
                ? "border-orange-500 ring-2 ring-orange-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
            aria-label={`Show image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
