import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMaterialCategory } from "@/store/materialSlice";

const CreateMaterialCategorySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

type CreateMaterialCategoryData = z.infer<typeof CreateMaterialCategorySchema>;

type CreateMaterialCategoryProps = {
  onCreate?: (name: string) => void; // Callback when a group is created
};
export function CreateMaterialCategory({ onCreate }: CreateMaterialCategoryProps) {
  // Managing the dialog open state
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const form = useForm<CreateMaterialCategoryData>({
    resolver: zodResolver(CreateMaterialCategorySchema),
    defaultValues: { name: "" },
  });

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  const onSubmit = (data: CreateMaterialCategoryData) => {
    // Dispatch Redux action to add group (will sync to localStorage automatically)
    dispatch(addMaterialCategory(data.name));
    onCreate?.(data.name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2">
          <PlusIcon />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md" onKeyDown={(e) => e.stopPropagation()}>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              // Prevent parent dialog from submitting and closing automatically
              e.stopPropagation();

              // Call the form submit handler
              form.handleSubmit(onSubmit)(e);
            }}
          >
            <DialogHeader>
              <DialogTitle>Create Material Category</DialogTitle>
              <DialogDescription>Create a new category to organize materials.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="off" placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
