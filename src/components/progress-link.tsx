"use client";

import NextLink, { type LinkProps } from "next/link";
import { useProgress } from "@/lib/progress-context";
import { type AnchorHTMLAttributes } from "react";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ProgressLink({ onClick, ...props }: Props) {
  const { start } = useProgress();

  return (
    <NextLink
      {...props}
      onClick={(e) => {
        start();
        onClick?.(e);
      }}
    />
  );
}