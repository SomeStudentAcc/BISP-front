/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  files: any[];
  onChange: (files: any[]) => void;
  loading: boolean;
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  existingImage?: string[] | null;
  isSingle?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductDragAndDrop({
  files,
  onChange,
  isSingle = false,
  loading,
  existingImage,
  setExistingImage,
  setLoading,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handleInputClick = () => {
    ref.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    setLoading(true);
    setTimeout(() => {
      onChange([...files, ...newFiles]);
      setLoading(false);
    }, 1000);
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      <div
        onClick={handleInputClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        className={cn(
          "cursor-pointer bg-[#F8F8FD] p-6 flex flex-col items-center justify-center max-w-[500px] w-full rounded-xl border-2 border-dashed transition-colors",
          drag ? "border-primary bg-primary/5" : "border-gray-300",
          loading && "opacity-50 pointer-events-none",
        )}
      >
        <input
          type="file"
          ref={ref}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept="image/*"
        />

        {loading ? (
          <div className="text-center">
            <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-2 text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <>
            <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </>
        )}
      </div>

      {existingImage && setExistingImage && (
        <div>
          {existingImage.map((el, index) => (
            <div key={index} className="space-y-2 w-fit">
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg group">
                <div className="w-40 h-40 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${el}`}
                    alt={"img"}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setExistingImage(
                      (prev) => prev?.filter((_, i) => i !== index) || [],
                    )
                  }
                  className="p-1 hover:bg-gray-100 w-fit rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {files.length > 0 && (
        <div className="space-y-2 max-w-[500px]">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white border rounded-lg group"
            >
              <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                {file.type?.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    📄
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
