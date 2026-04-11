import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { PropsWithChildren } from "react";

interface Props {
  heading: string;
}

export default function FormWrapper({
  children,
  heading,
}: PropsWithChildren<Props>) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
