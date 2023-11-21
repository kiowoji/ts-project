/* Task #2 - Create a function updateObjectInArray.ts - 
which has to update an object of a given shape in an array 
of uni-shaped objects and return a cloned array. */

export interface ObjectShape {
    id: number;
    name: string;
    age: number
}

export async function updateObjectInArray<ObjectShape>(
  initialArray: ObjectShape[],
  key: keyof ObjectShape,
  value: ObjectShape[typeof key],
  patch: Partial<ObjectShape>
): Promise<ObjectShape[]> {
  const updatedArray = initialArray.map((item) => {
    if (item[key] === value) {
      return { ...item, ...patch };
    }
    return item;
  });

  return updatedArray;
}