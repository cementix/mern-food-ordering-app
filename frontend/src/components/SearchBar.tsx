import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

const SearchBar = ({
  onSubmit,
  placeholder,
  onReset,
  searchQuery,
}: {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery?: string;
}) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) onReset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mb-5 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="md:block hidden ml-1 text-orange-500"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormControl>
              <Input
                {...field}
                className="shadow-none border-none focus-visible:ring-0 text-xl"
                placeholder={placeholder}
              />
            </FormControl>
          )}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type="submit" className="bg-orange-500 rounded-full">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
