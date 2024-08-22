import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

const MenuItemInput = ({
  index,
  removeMenuItem,
}: {
  index: number;
  removeMenuItem: () => void;
}) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price ($) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="6.65" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        <X />
      </Button>
    </div>
  );
};

export default MenuItemInput;
