import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentPosts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>TP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Test Post</p>
          <p className="text-sm text-muted-foreground">
            Description about test post
          </p>
        </div>
        <div className="ml-auto font-medium">50</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Another Post</p>
          <p className="text-sm text-muted-foreground">
            Description on another post
          </p>
        </div>
        <div className="ml-auto font-medium">45</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Test Post2</p>
          <p className="text-sm text-muted-foreground">
            just another test post
          </p>
        </div>
        <div className="ml-auto font-medium">32</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Test Post3</p>
          <p className="text-sm text-muted-foreground">
            another post description
          </p>
        </div>
        <div className="ml-auto font-medium">19</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Best Post2</p>
          <p className="text-sm text-muted-foreground">best post 2</p>
        </div>
        <div className="ml-auto font-medium">5</div>
      </div>
    </div>
  );
}
