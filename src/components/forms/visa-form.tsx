import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { api } from "~/utils/api";

interface VisaFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const formSchema = z.object({
  country: z.string().min(1),
  entryDate: z.date(),
  exitDate: z.date(),
  supportingDoc: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function VisaApplicationForm({
  className = "",
  ...props
}: VisaFormProps) {
  const router = useRouter();
  const ctx = api.useUtils();

  const { mutate, isLoading: isDataSubmitting } =
    api.visaApplication.submitVisaForm.useMutation({
      onSuccess: () => {
        void ctx.visaApplication.invalidate();
        void router.replace("/dashboard/user/visa");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;

        errorMessage?.forEach((msg) => {
          toast({
            title: "Error",
            description: msg ?? "Error",
          });
        });
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      entryDate: new Date(),
      exitDate: new Date(),
      supportingDoc: "",
    },
  });

  function onSubmit(_: FormData) {
    const formData = form.getValues();

    mutate(formData);
  }

  const disableForm = isDataSubmitting;

  return (
    <div className={cn("my-12 grid gap-6 px-2", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={disableForm} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Entry</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        // @ts-ignore
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exitDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Exit</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        // @ts-ignore
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supportingDoc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Link</FormLabel>
                  <FormControl>
                    <Input placeholder="India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="col-span-2 mt-6"
              disabled={disableForm}
            >
              Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
