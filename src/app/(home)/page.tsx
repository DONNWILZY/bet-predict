import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@radix-ui/react-progress";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
      </div>


      <div className="flex flex-col gap-4">

        <Input
          type="email"
          placeholder="Type here..."
          className="w-64 placeholder:tracking-wide shadow-lg"
        />
        <progress
          className="w-64 h-4 bg-gray-200 rounded-lg shadow-lg"

        />
        <textarea
          placeholder="Type here..."
          className="w-64 placeholder:tracking-wide shadow-lg"
        />

        <input
          type="checkbox"
          className="w-4 h-4 rounded shadow-lg"
        />
        <Button variant="elevated">
          Click me
        </Button>
      </div>

    </div>
  );
}
