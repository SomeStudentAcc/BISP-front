export function getMediaSource(path: string | undefined | null) {
  return process.env.NEXT_PUBLIC_MEDIA_URL! + path;
}
