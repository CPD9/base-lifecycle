import {Button} from "@/components/ui/button";

export default function Home() {
  return (<div className="flex flex-col gap-4">
    <Button variant="primary">Primary me</Button>
    <Button variant="secondary">Secondary me</Button>
    <Button variant="destructive">Destructive me</Button>
    <Button variant="outline">Outline me</Button>
    <Button variant="ghost">Ghost me</Button>
    <Button variant="link">Link me</Button>
  </div>
  );
}
