"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { createStudent, UpdateStudent } from "@/lib/actions/create/student";

const schema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required!" }),
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  photo: z.string().url({ message: "Invalid URL for photo!" }).optional(),
  grade: z.number().min(1, { message: "Grade is required and must be positive!" }),
  classId: z.string().min(1, { message: "Class ID is required!" }),
  parentId: z.string().optional(),
  userId: z.string().min(1, { message: "User ID is required!" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<Inputs>; // Making data optional for the update case
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data || {}, // Set default values if updating
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (type === "create") {
        await createStudent({ data: formData });
        alert("Student created successfully!");
      } else {
        await UpdateStudent({ data: formData });
        alert("Student updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update student"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student ID"
          name="studentId"
          defaultValue={data?.studentId}
          register={register}
          error={errors?.studentId}
        />
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Photo URL"
          name="photo"
          defaultValue={data?.photo}
          register={register}
          error={errors?.photo}
        />
        <InputField
          label="Grade"
          name="grade"
          type="number"
          defaultValue={data?.grade?.toString()}
          register={register}
          error={errors?.grade}
        />
        <InputField
          label="Class ID"
          name="classId"
          defaultValue={data?.classId}
          register={register}
          error={errors?.classId}
        />
        <InputField
          label="Parent ID"
          name="parentId"
          defaultValue={data?.parentId}
          register={register}
          error={errors?.parentId}
        />
        <InputField
          label="User ID"
          name="userId"
          defaultValue={data?.userId}
          register={register}
          error={errors?.userId}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
function updateStudent(arg0: { data: { studentId: string; name: string; email: string; grade: number; classId: string; userId: string; id?: string | undefined; phone?: string | undefined; address?: string | undefined; photo?: string | undefined; parentId?: string | undefined; }; }) {
  throw new Error("Function not implemented.");
}

