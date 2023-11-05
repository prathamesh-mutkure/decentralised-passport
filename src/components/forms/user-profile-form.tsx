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

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  dob: z.date(),
  phone: z.string().min(10).max(15),

  country: z.string().min(1),
  region: z.string().min(1),
  city: z.string().min(1),
  postal_code: z.string().min(1),
  address: z.string().min(1),

  nationalIdType: z.string().min(1),
  nationalId: z.string().min(1),
  nationalIdDoc: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function UserProfileForm({ className, ...props }: UserFormProps) {
  const router = useRouter();
  const ctx = api.useUtils();

  const { data: userStatusData, isLoading: isLoadingUserStatus } =
    api.user.isUserCreated.useQuery();

  const { mutate, isLoading: isDataSubmitting } =
    api.user.createUser.useMutation({
      onSuccess: () => {
        void ctx.user.invalidate();
        void router.replace("/dashboard/user");
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
      dob: new Date(),
      phone: "",

      country: "",
      region: "",
      city: "",
      postal_code: "",
      address: "",

      nationalIdType: "",
      nationalId: "",

      nationalIdDoc: null,
    },
  });

  function onSubmit(_: FormData) {
    const formData = form.getValues();

    mutate(formData);
  }

  const disableForm =
    isDataSubmitting || isLoadingUserStatus || userStatusData?.isProfileCreated;

  return (
    <div className={cn("my-12 grid gap-6 px-2", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={disableForm} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+91012345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region/State</FormLabel>
                  <FormControl>
                    <Input placeholder="Maharashtra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Mumbai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="410401" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address Line 1/2</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Tower, BKC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalIdType"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>National ID Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Aadhar Card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>National ID Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Aadhar Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalIdDoc"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>License Copy</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image/PDF of License"
                      type="file"
                      accept="image/*, application/pdf"
                      {...field}
                    />
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
