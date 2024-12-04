import { useEffect, useState } from "react";

import "./App.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState<number>(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const res = await fetch("api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    };

    fetchTotal();
  }, []);

  return (
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you&apos;ve spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
