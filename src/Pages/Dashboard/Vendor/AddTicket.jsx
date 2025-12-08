import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
const AddTicket = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTicket = (data) => {
    console.log(data);
    //post the data to database
    axiosSecure
      .post("/ticket", data)
      .then((res) => {
        console.log("after post data", res.data);
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Ticket Added!",
          text: "Your ticket has been successfully posted.",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while posting your ticket!",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <h1>Add Ticket Page</h1>

      <div className="rounded-xl border bg-card p-6 lg:p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-6">Add a New Ticket</h3>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(handleAddTicket)}
        >
          {/* Ticket Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Ticket Title
            </label>
            <input
              {...register("title", { required: "Ticket Title is required" })}
              type="text"
              placeholder="e.g., Express Bus from London to Paris"
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-primary focus:border-primary"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* From */}
          <div>
            <label className="block text-sm font-medium mb-1">
              From (Location)
            </label>
            <input
              {...register("from", { required: "From location is required" })}
              type="text"
              placeholder="e.g., London"
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-primary focus:border-primary"
            />
            {errors.from && (
              <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>
            )}
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium mb-1">
              To (Location)
            </label>
            <input
              {...register("to", { required: "To location is required" })}
              type="text"
              placeholder="e.g., Paris"
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-primary focus:border-primary"
            />
            {errors.to && (
              <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>
            )}
          </div>

          {/* Transport Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transport Type
            </label>
            <select
              {...register("transportType", {
                required: "Transport type is required",
              })}
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground focus:ring-primary focus:border-primary"
            >
              <option value="">Select transport</option>
              <option>Bus</option>
              <option>Train</option>
              <option>Flight</option>
              <option>Ship</option>
            </select>
            {errors.transportType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transportType.message}
              </p>
            )}
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Departure Date & Time
            </label>
            <input
              {...register("departure", {
                required: "Departure date & time is required",
              })}
              type="datetime-local"
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground focus:ring-primary focus:border-primary"
            />
            {errors.departure && (
              <p className="text-red-500 text-sm mt-1">
                {errors.departure.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Price (per unit)
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              type="number"
              placeholder="0.00"
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-primary focus:border-primary"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Ticket Quantity
            </label>
            <input
              {...register("quantity", { required: "Quantity is required" })}
              type="number"
              placeholder="100"
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-primary focus:border-primary"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Perks */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Perks</label>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="AC"
                  className="rounded border text-primary focus:ring-primary"
                />{" "}
                AC
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="Breakfast"
                  className="rounded border text-primary focus:ring-primary"
                />{" "}
                Breakfast
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="Wi-Fi"
                  className="rounded border text-primary focus:ring-primary"
                />{" "}
                Wi-Fi
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("perks")}
                  type="checkbox"
                  value="Power Outlet"
                  className="rounded border text-primary focus:ring-primary"
                />{" "}
                Power Outlet
              </label>
            </div>
          </div>

          {/* Image Upload I will handle it later */}
          {/* <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Image Upload (via imgbb)</label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-muted p-6 cursor-pointer hover:bg-muted/70 transition text-center">
              <span className="material-symbols-outlined text-4xl text-muted-foreground">upload_file</span>
              <div className="mt-2 text-muted-foreground">
                <p className="text-sm">Click to browse or drag and drop</p>
                <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div> */}

          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Vendor Name
            </label>
            <input
              readOnly
              type="text"
              value={user?.displayName || ""}
              {...register("vendorName", { required: true })}
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Vendor Email
            </label>
            <input
              readOnly
              type="email"
              value={user?.email || ""}
              {...register("vendorEmail", { required: true })}
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 transition cursor-pointer"
            >
              Add Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
