import { Button } from "@/core/presentation/components/base/ui/button";
import { Input } from "@/core/presentation/components/base/ui/input";
import { Label } from "@/core/presentation/components/base/ui/label";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useWatch, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";

interface ListHandlerFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  title?: string;
  path: Path<T>;
}

export default function ListHandlerForm<T extends FieldValues>({ form, title, path }: ListHandlerFormProps<T>) {
  const { control, setValue, getValues } = form;

  // ✅ local input state
  const [newItem, setNewItem] = useState("");

  // ✅ safe watch
  const items =
    (useWatch({
      control,
      name: path,
    }) as { list_index: number; detail: string }[]) || [];

  const addItem = async (value: string) => {
    if (!value.trim()) return;

    const current = (getValues(path) || []) as typeof items;

    const newEntry = {
      list_index: current.length + 1,
      detail: value,
    };

    setValue(path, [...current, newEntry] as any, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setNewItem("");

    // 🔥 revalidate AFTER update
    await form.trigger(path);
  };

  const removeItem = (index: number) => {
    const current = (getValues(path) || []) as typeof items;

    const updated = current.filter((_, i) => i !== index);

    // reindex
    const reindexed = updated.map((item, i) => ({
      ...item,
      list_index: i,
    }));

    setValue(path, reindexed as any);
  };

  return (
    <div className="w-full">
      {title && <Label className="mb-3  text-muted-foreground">{title}</Label>}

      {/* INPUT */}
      <div className="w-full flex items-center gap-2">
        <Input
          className={`w-full ${form.getFieldState(path).error && "border-destructive"}`}
          placeholder={title}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button type="button" onClick={() => addItem(newItem)}>
          <PlusCircleIcon />
        </Button>
      </div>

      {/* LIST */}
      {items.length !== 0 && (
        <div className="mt-10">
          {items.map((item, index) => (
            <div className="flex items-start gap-4" key={index}>
              <Button type="button" variant="icon" size="icon" onClick={() => removeItem(index)}>
                <Trash2Icon />
              </Button>

              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
