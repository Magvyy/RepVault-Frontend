import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseTable } from "@/features/exercise";
import type { UIExercise } from "@/shared/types/ExerciseAPI";
import { useState } from "react";





export default function CreateSessionPage() {
    const [exercises, setExercises] = useState<UIExercise[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleClick();
    }

    const handleClick = () => {

    }

    return (
        <div className="w-full p-8 flex flex-col justify-center items-center">
            <ExerciseTable/>
            {exercises.map((exercise, key) => 
                <ExerciseTable
                    key={key}
                    exercise={exercise}
                />
            )}
        </div>
    )
}