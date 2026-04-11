import { VariantProps, cva } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getMediaSource } from "@/utils/get-media-source.util";

const avatarSizes = cva("", {
  variants: {
    size: {
      sm: "size-7",
      default: "size-9",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function UserAvatar() {
  return (
    <div className="relative">
      <Avatar>
        {/*  <AvatarImage
          className="object-cover"
          src={getMediaSource(channel.avatar)}
        /> */}
        <AvatarFallback>{"A"}</AvatarFallback>
      </Avatar>
    </div>
  );
}
