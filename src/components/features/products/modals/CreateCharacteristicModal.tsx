import axiosInstance from "@/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProductCharacteristic } from "@/types/product/product.types";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
  setExistingChars: Dispatch<SetStateAction<IProductCharacteristic[]>>;
}

export default function CreateCharacteristicModal({
  open,
  setOpen,
  productId,
  setExistingChars,
}: Props) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const handleSave = async () => {
    if (!title || !value) return;

    try {
      const res = await axiosInstance.post("/characteristic", {
        title: title,
        value: value,
        productId: productId,
      });

      setExistingChars((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setValue("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new characteristic</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label className="mb-3">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Characteristic title"
            />
          </div>

          <div>
            <Label className="mb-3">Value</Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Characteristic value"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSave}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
