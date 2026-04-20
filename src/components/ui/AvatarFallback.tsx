"use client";

import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  size: number;
}

export default function AvatarFallback({ src, alt, size }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        animation: "blobMorph 8s ease-in-out infinite",
        border: "2px solid rgba(0,212,255,0.25)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover object-top"
        priority
      />
    </div>
  );
}
