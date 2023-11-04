import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SignedIn, UserButton } from "@clerk/nextjs";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <SignedIn>
        <UserButton afterSignOutUrl="/login" />
      </SignedIn>
    </DropdownMenu>
  );
}
