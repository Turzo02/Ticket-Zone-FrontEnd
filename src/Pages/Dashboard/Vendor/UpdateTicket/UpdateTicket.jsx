import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiousSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateTicket = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const handleUpdateTicket = async (data) => {
    console.log(data);

    try {
      const ticketImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", ticketImg);

      // Image Upload
      const img_Api_Url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_UPLOAD_API
      }`;

      const imgRes = await axios.post(img_Api_Url, formData);
      const hostedImg = imgRes.data.data.url;

      console.log("Hosted Image URL:", hostedImg);

      // Ticket Data Submission
      const finalData = {
        ...data,
        status: "pending",
        photo: hostedImg,
      };

      const ticketRes = await axiosSecure.patch(`/ticket/${id}`, finalData);
      console.log("after Update data", ticketRes.data);
      Swal.fire({
        icon: "success",
        title: "Ticket Updated!",
        text: "Your ticket Info has been successfully Added.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error during ticket process:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while Updating your ticket! Please check the console for details.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>

    <div className="p-4 sm:p-8 bg-base-100 text-base-content max-w-7xl mx-auto">
      <div className="text-center py-8 mb-6 md:py-8  bg-base-200 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
          Update Your Ticket Info
        </h1>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-200 p-6 lg:p-8 shadow-2xl">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(handleUpdateTicket)}
        >
          {/* Ticket Title */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Ticket Title</span>
            </label>
            <input
              {...register("title", { required: "Ticket Title is required" })}
              type="text"
              placeholder="e.g., Express Bus from London to Paris"
              // Use DaisyUI input classes
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* From */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">From (Location)</span>
            </label>
            <input
              {...register("from", { required: "From location is required" })}
              type="text"
              placeholder="e.g., London"
              className="input input-bordered w-full"
            />
            {errors.from && (
              <p className="text-error text-sm mt-1">{errors.from.message}</p>
            )}
          </div>

          {/* To */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">To (Location)</span>
            </label>
            <input
              {...register("to", { required: "To location is required" })}
              type="text"
              placeholder="e.g., Paris"
              className="input input-bordered w-full"
            />
            {errors.to && (
              <p className="text-error text-sm mt-1">{errors.to.message}</p>
            )}
          </div>

          {/* Transport Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Transport Type</span>
            </label>
            <select
              {...register("transportType", {
                required: "Transport type is required",
              })}
              // Use DaisyUI select classes
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select transport
              </option>
              <option>Bus</option>
              <option>Train</option>
              <option>Flight</option>
              <option>Ship</option>
            </select>
            {errors.transportType && (
              <p className="text-error text-sm mt-1">
                {errors.transportType.message}
              </p>
            )}
          </div>

          {/* Departure Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Departure Date & Time
              </span>
            </label>
            <input
              {...register("departure", {
                required: "Departure date & time is required",
              })}
              type="datetime-local"
              className="input input-bordered w-full"
            />
            {errors.departure && (
              <p className="text-error text-sm mt-1">
                {errors.departure.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price (per unit)</span>
            </label>
            <input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="0.00"
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-error text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Ticket Quantity</span>
            </label>
            <input
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="100"
              className="input input-bordered w-full"
            />
            {errors.quantity && (
              <p className="text-error text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Perks */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Perks</span>
            </label>
            <div className="flex flex-wrap gap-6 text-sm">
              <label className="label cursor-pointer gap-2">
                <input
                  {...register("perks", { required: "Perks are required" })}
                  type="checkbox"
                  value="AC"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">AC</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="Breakfast"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Breakfast</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="Wi-Fi"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Wi-Fi</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="Power Outlet"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Power Outlet</span>
              </label>
            </div>
            {errors.perks && (
              <p className="text-error text-sm mt-1">{errors.perks.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">
                Ticket Image (Required)
              </span>
            </label>

            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered file-input-primary w-full"
              placeholder="Your Photo"
            />

            {errors.photo && errors.photo.type === "required" && (
              <p className="text-error text-sm mt-1">Photo is required.</p>
            )}
          </div>

          {/* Vendor Name (Read-Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Vendor Name</span>
            </label>
            <input
              readOnly
              type="text"
              value={user?.displayName || ""}
              {...register("vendorName")}
              // Use input-disabled for read-only fields
              className="input input-bordered w-full input-disabled"
            />
          </div>

          {/* Vendor Email (Read-Only) */}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Vendor Email</span>
            </label>
            <input
              readOnly
              type="email"
              value={user?.email || ""}
              {...register("vendorEmail")}
              className="input input-bordered w-full input-disabled"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right pt-4">
            <button
              type="submit"
              // Use DaisyUI btn-primary
              className="btn btn-lg btn-primary shadow-xl shadow-primary/40 transition"
            >
              Add Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateTicket;
