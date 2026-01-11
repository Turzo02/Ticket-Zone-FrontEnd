import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiousSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useRole from "../../../../Hooks/useRole";
import SwappingDotLoader from "../../../../Components/Loading/SwappingDotLoader";
import { useParams } from "react-router";

const UpdateTicket = () => {

  const {id} = useParams()
  // console.log(id)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {role} = useRole();
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

    const handleUpdateTicket = async (data) => {
    if (role !== "vendor") {
        console.error("Authorization failed on client side: User is not a Vendor.");
        Swal.fire({
            icon: "error",
            title: "Access Denied!",
            text: "Only Vendors are allowed to perform this action.",
            confirmButtonText: "OK",
        });
        return; 
    }
    const confirmationResult = await Swal.fire({
        title: "Confirm Ticket Submission?",
        text: "Are you sure all ticket details are correct and ready to be submitted?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit Ticket",
        cancelButtonText: "Cancel"
    });

    // Stop execution if the user cancels
    if (!confirmationResult.isConfirmed) {
        return;
    }
          setIsLoading(true);
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

      // console.log("Hosted Image URL:", hostedImg);

      // Ticket Data Submission
      const finalData = {
        ...data,
        status: "pending",
        photo: hostedImg,
      };

      const ticketRes = await axiosSecure.patch(`/ticket/vendor/${id}`, finalData);
      // console.log("after Update data", ticketRes.data);
      Swal.fire({
        icon: "success",
        title: "Ticket Updated!",
        text: "Your ticket Info has been successfully Added.",
        confirmButtonText: "OK",
      });
      reset()
    } catch (error) {
      console.error("Error during ticket process:", error);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while Updating your ticket! Please check the console for details.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading){
    return <SwappingDotLoader></SwappingDotLoader>
  }

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-main) p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            Update Ticket Info
          </h1>
          <p className="text-(--text-muted) font-medium text-sm">
            Modify route details, pricing, or schedule.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-[2.5rem] bg-(--bg-card) border border-(--border-card) p-8 lg:p-12 shadow-2xl shadow-black/5">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            onSubmit={handleSubmit(handleUpdateTicket)}
          >
            
            {/* 1. Ticket Title */}
            <div className="form-control md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Ticket Title</label>
              <input
                {...register("title", { required: "Ticket Title is required" })}
                type="text"
                placeholder="e.g., Express Bus Service"
                className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted)/40 focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-medium"
              />
              {errors.title && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.title.message}</p>}
            </div>

            {/* 2. Locations */}
            <div className="form-control space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">From</label>
              <input
                {...register("from", { required: "Origin is required" })}
                type="text"
                className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-medium"
              />
              {errors.from && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.from.message}</p>}
            </div>

            <div className="form-control space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">To</label>
              <input
                {...register("to", { required: "Destination is required" })}
                type="text"
                className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-medium"
              />
              {errors.to && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.to.message}</p>}
            </div>

            {/* 3. Transport & Schedule */}
            <div className="form-control space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Transport Mode</label>
              <div className="relative">
                <select
                  {...register("transportType", { required: "Transport type is required" })}
                  className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) appearance-none focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-medium cursor-pointer"
                >
                  <option value="" disabled>Select Type</option>
                  <option>Bus</option>
                  <option>Train</option>
                  <option>Flight</option>
                  <option>Ship</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-(--text-muted)">
                  ▼
                </div>
              </div>
              {errors.transportType && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.transportType.message}</p>}
            </div>

            <div className="form-control space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Departure</label>
              <input
                {...register("departure", { required: "Departure time is required" })}
                type="datetime-local"
                className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-medium cursor-pointer"
              />
              {errors.departure && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.departure.message}</p>}
            </div>

            {/* 4. Price & Qty */}
            <div className="form-control space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Price ($)</label>
              <input
                {...register("price", { required: "Price is required", valueAsNumber: true })}
                type="number"
                className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-mono font-bold text-lg"
              />
              {errors.price && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.price.message}</p>}
            </div>

            <div className="form-control space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Quantity</label>
              <input
                {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
                type="number"
                className="w-full px-6 py-4 rounded-2xl bg-(--input-bg) border border-(--input-border) text-(--text-main) focus:border-(--grad-start) focus:ring-4 focus:ring-(--grad-start)/10 outline-none transition-all duration-300 font-mono font-bold text-lg"
              />
              {errors.quantity && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.quantity.message}</p>}
            </div>

            {/* 5. Perks Toggle */}
            <div className="form-control md:col-span-2 space-y-3">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Perks</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["AC", "Breakfast", "Wi-Fi", "Power Outlet"].map((perk) => (
                  <label key={perk} className="cursor-pointer group relative">
                    <input
                      {...register("perks", { required: "Please select at least one perk" })} // ✅ Added Validation Here
                      type="checkbox"
                      value={perk}
                      className="peer sr-only"
                    />
                    <div className="
                      w-full h-full flex items-center justify-center py-4 rounded-2xl
                      border border-(--input-border) bg-(--input-bg) 
                      text-sm font-bold text-(--text-muted)
                      transition-all duration-200
                      peer-checked:bg-linear-to-r peer-checked:from-(--grad-start) peer-checked:to-(--grad-end) 
                      peer-checked:text-(--text-inv) peer-checked:border-transparent 
                      peer-checked:shadow-lg peer-checked:shadow-(--grad-start)/20
                      peer-checked:scale-[1.02]
                      group-hover:border-(--grad-start)/30
                    ">
                      {perk}
                    </div>
                  </label>
                ))}
              </div>
              {/* ✅ Error Message Display */}
              {errors.perks && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.perks.message}</p>}
            </div>

            {/* 6. Image Upload */}
            <div className="form-control md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-(--text-muted) uppercase tracking-wide ml-1">Ticket Thumbnail</label>
              <div className="relative">
                <input
                  type="file"
                  {...register("photo", { required: "Ticket image is required" })} // ✅ Added Validation Here
                  className="
                    block w-full text-sm text-(--text-muted)
                    file:mr-4 file:py-3 file:px-6
                    file:rounded-xl file:border-0
                    file:text-xs file:font-bold file:uppercase file:tracking-wide
                    file:bg-(--bg-soft-accent) file:text-(--text-main)
                    hover:file:bg-(--grad-start) hover:file:text-white
                    file:transition-all file:cursor-pointer file:shadow-sm
                    border border-dashed border-(--input-border) rounded-2xl p-2
                    bg-(--input-bg)
                  "
                />
              </div>
              {/* ✅ Error Message Display */}
              {errors.photo && <p className="text-red-500 text-xs font-bold pl-2 mt-1">{errors.photo.message}</p>}
            </div>

            {/* 7. Read-Only Footer */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-(--border-card) opacity-70">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-(--text-muted) uppercase">Vendor Name</label>
                <div className="text-sm font-bold text-(--text-main)">
                   {user?.displayName || "N/A"}
                </div>
                <input type="hidden" value={user?.displayName || ""} {...register("vendorName")} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-(--text-muted) uppercase">Vendor Email</label>
                <div className="text-sm font-mono font-medium text-(--text-main)">
                   {user?.email || "N/A"}
                </div>
                <input type="hidden" value={user?.email || ""} {...register("vendorEmail")} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black text-lg text-(--text-inv) bg-linear-to-r from-(--grad-start) to-(--grad-end) shadow-xl shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );

};

export default UpdateTicket;
