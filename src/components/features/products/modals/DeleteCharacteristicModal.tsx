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
import { IProductCharacteristic } from "@/types/product/product.types";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
  setExistingChars: Dispatch<SetStateAction<IProductCharacteristic[]>>;
  characteristic: IProductCharacteristic;
}

export default function DeleteCharacteristicModal({
  open,
  setOpen,
  productId,
  setExistingChars,
  characteristic,
}: Props) {
  const handleSave = async () => {
    try {
      const res = await axiosInstance.delete("/characteristic", {
        data: {
          productId: productId,
          id: characteristic.id,
        },
      });

      setExistingChars((prev) =>
        prev.filter((item) => item.id !== characteristic.id),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete characteristic</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button variant={"destructive"} onClick={handleSave}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
