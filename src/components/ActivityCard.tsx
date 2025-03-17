import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ActivityCardProps {
  title: string;
  description: string;
  data: any[];
  columns: {
    key: string;
    header: string;
    render?: (value: any, item: any) => React.ReactNode;
  }[];
  footerButton?: {
    label: string;
    onClick: () => void;
  };
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  data,
  columns,
  footerButton
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column.key}`}>
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {footerButton && (
        <CardFooter>
          <Button className="w-full" onClick={footerButton.onClick}>
            {footerButton.label}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};