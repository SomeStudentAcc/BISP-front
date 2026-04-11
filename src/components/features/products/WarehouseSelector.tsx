"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IWarehouse } from "@/types/warehousees/warehouses.types";
import { Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";

interface Props {
  options: IWarehouse[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
}

export default function WarehouseSelector({
  options,
  selectedIds,
  onChange,
  placeholder = "Search and add items",
  label,
  searchPlaceholder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const selectedOptions = options.filter((option) =>
    selectedIds.includes(option.id),
  );

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddItem = (id: string) => {
    const isAlreadySelected = selectedIds.includes(id);

    if (!isAlreadySelected) {
      onChange([...selectedIds, id]);
    }

    setIsOpen(false);
    setSearchQuery("");
  };

  const handleRemoveItem = (id: string) => {
    onChange(selectedIds.filter((selectedId) => selectedId !== id));
  };

  useClickAway(dropdownRef, () => {
    setIsOpen(false);
    setSearchQuery("");
  }, ["click"]);

  return (
    <div>
      {label && <p className="mb-1">{label}</p>}
      <div ref={dropdownRef} className="w-full">
        <div className="relative">
          <div
            onClick={() => setIsOpen(true)}
            className="relative mb-4 flex transition-all overflow-hidden  duration-200 "
          >
            <Input
              placeholder={searchPlaceholder || placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {/*   {isOpen && (
            <div className="absolute top-full mt-2 w-full bg-white mb-3 overflow-y-auto flex max-h-[200px] flex-col rounded-xl transition-all duration-200 shadow-md">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    onClick={() => handleAddItem(option.id)}
                    key={option.id}
                    className="cursor-pointer items-center py-2 px-3 hover:bg-[#E7F0FA]"
                  >
                    <div className="flex items-center">
                      {option.logo && (
                        <Image
                          className="mr-2"
                          src={option.logo}
                          height={16}
                          width={16}
                          alt=""
                        />
                      )}
                      <p className="font-medium text-[#8497BD]">
                        {option.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 px-3 text-center text-[#8497BD]">
                  No results found
                </div>
              )}
            </div>
          )} */}
        </div>
        {isOpen && (
          <div className=" w-full bg-white mb-3 overflow-y-auto flex max-h-[200px] flex-col rounded-xl transition-all duration-200 shadow-md">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  onClick={() => handleAddItem(option.id)}
                  key={option.id}
                  className="cursor-pointer items-center py-2 px-3 hover:bg-[#E7F0FA]"
                >
                  <div className="flex items-center">
                    <p className="font-medium text-[#8497BD]">{option.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-4 px-3 text-center text-[#8497BD]">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
      {selectedOptions.length > 0 && (
        <div className="flex gap-2 items-center flex-wrap">
          {selectedOptions.map((option) => (
            <div
              key={option.id}
              className="flex cursor-pointer items-center gap-3  p-2 bg-[#E7F0FA] rounded-[35px]"
            >
              <div className="flex items-center">
                <p className="font-medium text-[#8497BD]">{option.name}</p>
              </div>
              <Button
                className="p-0"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleRemoveItem(option.id)}
              >
                <X size={20} className="text-primary " />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
