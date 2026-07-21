"use client";

import * as React from "react";
import { Camera, Film } from "lucide-react";

const isVideo = (p: string) => /\.(mp4|webm|mov|m4v|ogg)$/i.test(p);

function Placeholder({ video }: { video: boolean }) {
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1 bg-[hsl(var(--card-2))] text-muted-foreground">
      {video ? <Film className="h-6 w-6" /> : <Camera className="h-6 w-6" />}
      <small className="text-xs">{video ? "video în curând" : "poză în curând"}</small>
    </div>
  );
}

export function MediaItem({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = React.useState(false);
  const video = isVideo(src);

  const shell =
    "relative block overflow-hidden rounded-lg border border-border transition-transform hover:scale-[1.02]";

  if (broken) {
    return (
      <div className={shell + " border-dashed"}>
        <Placeholder video={video} />
      </div>
    );
  }

  if (video) {
    return (
      <div className={shell}>
        <video
          src={src}
          controls
          preload="metadata"
          className="aspect-[4/3] w-full object-cover"
          onError={() => setBroken(true)}
        />
      </div>
    );
  }

  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className={shell}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
        onError={() => setBroken(true)}
      />
    </a>
  );
}
