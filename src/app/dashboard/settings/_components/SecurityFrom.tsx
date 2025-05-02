/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

// Define Zod schema
const formSchema = z.object({
  adminPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(50, { message: 'Password must not exceed 50 characters.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: 'Password must contain at least one letter and one number.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SecurityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Security form submitted:', values);
    } catch (error) {
      console.error('Error submitting security form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 mt-[60px] shadow-[0px_4px-12px_0px_#0000001A]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-white rounded-[15px]">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-blue-700 text-xl font-semibold">Security</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-[50px]">
                <FormLabel className="text-sm font-medium text-gray-700 w-1/3">Change Admin Password:</FormLabel>
                <FormField
                  control={form.control}
                  name="adminPassword"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            className="w-full p-2 border rounded-md bg-[#F5F7FA]"
                            placeholder='***************************'
                            aria-label="Admin password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-[30px]">
                <Button type="button" className="px-4 py-2 bg-[#FFA400] text-white rounded-md" onClick={() => form.reset()}>
                  Cancel
                </Button>
                <Button type="submit" className="px-4 py-2 bg-[#004AAD] text-white rounded-md">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}