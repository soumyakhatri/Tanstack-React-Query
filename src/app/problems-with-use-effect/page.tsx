"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import FetchWithUseEffect from "./FetchWithUseEffect";
import FetchWithUseEffectFixed from "./FetchWithUseEffectFixed";

export default function ProblemsWithUseEffectPage() {
  const [category, setCategory] = useState("technology");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">
          The Problems with useEffect for Data Fetching
        </h1>
        <p className="mb-4">
          This example demonstrates why fetching data with useEffect can lead to
          problems. Try changing categories quickly to observe race conditions.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Select a Category</h2>
        <div className="flex space-x-2 mb-4">
          <Button
            variant={category === "technology" ? "default" : "outline"}
            onClick={() => setCategory("technology")}
          >
            Technology
          </Button>
          <Button
            variant={category === "design" ? "default" : "outline"}
            onClick={() => setCategory("design")}
          >
            Design
          </Button>
          <Button
            variant={category === "productivity" ? "default" : "outline"}
            onClick={() => setCategory("productivity")}
          >
            Productivity
          </Button>
          <Button
            variant={category === "nonexistent" ? "default" : "outline"}
            onClick={() => setCategory("nonexistent")}
          >
            Empty Category
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-red-100 p-3 font-medium border-b">
            Problem: useEffect with Bugs
          </div>
          <FetchWithUseEffect category={category} />
        </div>

        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-green-100 p-3 font-medium border-b">
            Solution: useEffect with Fixes
          </div>
          <FetchWithUseEffectFixed category={category} />
        </div>
      </div>

      <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold">
          Problems with useEffect for Data Fetching:
        </h2>

        <div>
          <h3 className="text-lg font-bold">1. Race Conditions</h3>
          <p>
            If you quickly switch between categories, responses might come back
            in a different order than requested. The component has no way to
            know which request is the latest.
          </p>
          <p className="text-green-600 mt-1">
            <strong>Solution:</strong> Use an &quot;ignore&quot; flag in a
            cleanup function to ignore stale responses.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">2. Manual State Handling</h3>
          <p>
            We need to manually track loading, error, and success states with
            separate useState hooks, creating boilerplate code.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">3. No Data vs. Empty Results</h3>
          <p>
            It&apos;s difficult to distinguish between &quot;we haven&apos;t
            loaded data yet&quot; and &quot;the query returned no results.&quot;
          </p>
          <p className="text-green-600 mt-1">
            <strong>Solution:</strong> Initialize data state to undefined
            instead of an empty array.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold">4. Stale Data Issues</h3>
          <p>
            When an error occurs, we often don&apos;t clear previous data,
            leading to potentially displaying stale information.
          </p>
          <p className="text-green-600 mt-1">
            <strong>Solution:</strong> Reset data state when errors occur and
            reset error state when data loads successfully.
          </p>
        </div>
      </div>
    </div>
  );
}
