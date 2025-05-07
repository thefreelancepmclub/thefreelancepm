/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { settingAction } from "@/action/site/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generalFormSchema, GeneralFormType } from "@/schemas/site";
import { zodResolver } from "@hookform/resolvers/zod";
import { Setting } from "@prisma/client";
import { X } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  initialData?: Setting;
}

export default function GeneralForm({ initialData }: Props) {
  const [isUpdateReady, setUpdateReady] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<GeneralFormType>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: initialData?.siteName ?? "",
      supportEmail: initialData?.supportEmail ?? "",
      description: initialData?.description ?? "",
      keywords: initialData?.keywords ?? ([] as string[]),
      language: undefined,
    },
  });

  const onSubmit: any = async (values: GeneralFormType) => {
    startTransition(() => {
      settingAction(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
      });
    });
  };

  const TagInput = ({
    value = [],
    onChange,
  }: {
    value: string[];
    onChange: (tags: string[]) => void;
  }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        const newTags = Array.from(new Set([...value, inputValue.trim()]));
        onChange(newTags);
        setInputValue("");
      }
    };

    const removeTag = (index: number) => {
      const newTags = value.filter((_, i) => i !== index);
      onChange(newTags);
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-blue-800 hover:text-blue-900"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {isUpdateReady && (
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a keyword and press Enter"
            className="w-full p-2 border rounded-md bg-white"
            aria-label="Add keyword"
            disabled={!isUpdateReady}
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full px-6 mt-[70px] shadow-[0px-4px_12px_0px_#0000001A]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-[#FFFFFF] rounded-[15px]">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-blue-700 text-xl font-semibold">
                General
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3">
                  Site Name:
                </FormLabel>
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full p-2 border rounded-md bg-[#F5F7FA]"
                          placeholder="FreelancePM Club"
                          aria-label="Site name"
                          disabled={!isUpdateReady}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3">
                  Support Email:
                </FormLabel>
                <FormField
                  control={form.control}
                  name="supportEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="support@freelancepm.com"
                          {...field}
                          className="w-full p-2 border rounded-md bg-[#F5F7FA]"
                          aria-label="Support email"
                          disabled={!isUpdateReady}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start gap-4">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3 pt-2">
                  Description:
                </FormLabel>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Textarea
                          {...field}
                          className="w-full p-2 border rounded-md bg-[#F5F7FA] min-h-[100px] resize-y"
                          placeholder="Description................."
                          aria-label="Site description"
                          disabled={!isUpdateReady}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start gap-4">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3 pt-2">
                  Keywords:
                </FormLabel>
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <TagInput
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="flex items-center gap-4">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3">
                  Language:
                </FormLabel>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="w-full p-2 border rounded-md bg-white"
                            aria-label="Language"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
              <div className="flex justify-end space-x-[30px] pt-[50px]">
                <Button
                  type="button"
                  className="px-4 py-2 bg-[#FFA400] hover:bg-[#FFA400]/80 text-white rounded-md"
                  onClick={() => setUpdateReady((p) => !p)}
                >
                  Update
                </Button>

                {isUpdateReady && (
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-[#004AAD] text-white rounded-md"
                    disabled={pending}
                  >
                    {pending ? "Saving..." : "Save"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
