import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./shared";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>PubliPack</CardTitle>
          <CardDescription>Welcome to PubliPack application</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your application is ready. Start building your features!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
