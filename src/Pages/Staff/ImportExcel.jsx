import React, { useState } from "react";
import Container from "../../Componants/Container/Container";
import { useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ImArrowUp2 } from "react-icons/im";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ImportExcel = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: candidates = [], refetch } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const res = await axiosSecure.get("/candidates");
      return res.data;
    },
  });

  console.log(candidates);

  const handleUploadeFile = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", data.photo[0]);

      const res = await axiosSecure.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "File uploaded successfully");
      refetch();
      reset();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container className="flex flex-col justify-center items-center min-h-screen gap-4">
        <form
          onSubmit={handleSubmit(handleUploadeFile)}
          className="flex flex-col items-center gap-4"
        >
          {/* Label */}
          <label className="label font-semibold text-gray-700">
            Upload Excel File
          </label>

          {/* Upload Box */}
          <label
            title="Choose file"
            className="relative flex items-center justify-center
              w-20 h-20 rounded-full cursor-pointer
              bg-gray-200 hover:bg-gray-300 transition"
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              {...register("photo", { required: true })}
              className="hidden"
            />

            <FaCloudUploadAlt className="text-3xl text-gray-500" />

            <span
              className="absolute bottom-1 right-1
                w-6 h-6 rounded-full bg-white
                flex items-center justify-center shadow"
            >
              <ImArrowUp2 className="text-green-400 text-sm font-bold" />
            </span>
          </label>

          {/* Error */}
          {errors.photo && (
            <p className="text-sm text-red-500">Please upload an Excel file!</p>
          )}

          {/* Submit Button */}
          <button disabled={loading} className="btn btn-secondary px-8">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </Container>
    </div>
  );
};

export default ImportExcel;
