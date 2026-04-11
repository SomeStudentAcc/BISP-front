import CreateCharacteristicModal from "@/components/features/products/modals/CreateCharacteristicModal";
import DeleteCharacteristicModal from "@/components/features/products/modals/DeleteCharacteristicModal";
import UpdateCharacteristicModal from "@/components/features/products/modals/UpdateCharacteristicModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProductCharacteristic } from "@/types/product/product.types";
import { Dispatch, SetStateAction, useState } from "react";
interface Props {
  existingChars: IProductCharacteristic[];
  productId: string;
  setExistingChars: Dispatch<SetStateAction<IProductCharacteristic[]>>;
}

export default function ProductCahracteristics({
  existingChars,
  productId,
  setExistingChars,
}: Props) {
  const [isCreateCharacteristic, setCreateCharacteristic] = useState(false);
  const [isUpdateCharacteristic, setUpdateCharacteristic] = useState(false);
  const [isDeleteCharacteristics, setDeleteCharacteristics] = useState(false);
  const [currentCharacteristic, setCurrentCharacteristic] =
    useState<IProductCharacteristic>();
  return (
    <>
      <div className="flex flex-col gap-3 px-5">
        {existingChars.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end">
            <div className="flex flex-col w-full">
              <Label>Characteristic title</Label>
              <Input placeholder="Title" value={field.title} disabled />
            </div>
            <div className="flex flex-col w-full">
              <Label>Characteristic value</Label>
              <Input placeholder="Value" value={field.value} disabled />
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setCurrentCharacteristic(field);
                setUpdateCharacteristic(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setCurrentCharacteristic(field);
                setDeleteCharacteristics(true);
              }}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => setCreateCharacteristic(true)}
        >
          Add field
        </Button>
      </div>

      {isCreateCharacteristic && (
        <CreateCharacteristicModal
          productId={productId}
          setExistingChars={setExistingChars}
          open={isCreateCharacteristic}
          setOpen={setCreateCharacteristic}
        />
      )}

      {isUpdateCharacteristic && currentCharacteristic && (
        <UpdateCharacteristicModal
          productId={productId}
          setExistingChars={setExistingChars}
          open={isUpdateCharacteristic}
          setOpen={setUpdateCharacteristic}
          characteristic={currentCharacteristic}
        />
      )}

      {isDeleteCharacteristics && currentCharacteristic && (
        <DeleteCharacteristicModal
          productId={productId}
          setExistingChars={setExistingChars}
          open={isDeleteCharacteristics}
          setOpen={setDeleteCharacteristics}
          characteristic={currentCharacteristic}
        />
      )}
    </>
  );
}
