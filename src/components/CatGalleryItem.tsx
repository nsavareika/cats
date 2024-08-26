import Image from "next/image";
import { useState } from "react";
import Cat from "../types/Cat";
import CatGalleryItemPlaceholder from "./CatGalleryItemPlaceholder";

type Props = Cat & {
  order: number;
};

export default function CatGalleryItem({ id, url, order }: Readonly<Props>) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div key={id} className="relative aspect-[500/300]">
      {!isLoaded && <CatGalleryItemPlaceholder />}
      <Image
        alt="cat image"
        className={`object-cover rounded-lg ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        fill
        loading={order < 4 ? "eager" : "lazy"}
        priority={order < 4}
        sizes="100%"
        src={url}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </div>
  );
}
