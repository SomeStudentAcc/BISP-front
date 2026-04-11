import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { PropsWithChildren } from "react";

interface Props {
  heading: string;
}

export default function AuthWrapper({
  children,
  heading,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-blue-500">
      <Card className="w-[450px]">
        <CardHeader className="flex-row items-center justify-center gap-x-4">
          <h1>Stoka</h1>
        </CardHeader>
        <CardTitle className="text-center">{heading}</CardTitle>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
