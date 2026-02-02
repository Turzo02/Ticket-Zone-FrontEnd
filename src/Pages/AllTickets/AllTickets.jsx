import { useState, useRef, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import { Filter, ArrowUpDown, Search, ChevronDown, Check } from "lucide-react";
import SingleTicket from "./SingleTicket/SingleTicket";
import TicketCardSkeleton from "../../Components/TicketCardSkeleton/TicketCardSkeleton";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

// --- Internal Custom Dropdown Component ---
const CustomDropdown = ({
  options,
  value,
  onChange,
  icon: Icon,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full sm:w-auto min-w-45" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full px-4 py-2.5 rounded-xl border transition-all duration-200
          ${
            isOpen
              ? "border-(--input-focus) ring-1 ring-(--input-focus) bg-(--input-bg)"
              : "border-(--input-border) bg-(--input-bg) hover:border-(--input-focus)"
          }
        `}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {Icon && <Icon className="w-5 h-5 text-(--grad-start) shrink-0" />}
          <span
            className={`text-sm font-semibold truncate ${
              selectedOption ? "text-(--text-main)" : "text-(--text-main)"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-(--text-muted) transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 p-1.5 rounded-xl border border-(--border-card) bg-(--bg-card) shadow-xl shadow-black/10 animate-in fade-in zoom-in-95 duration-100 origin-top">
          <div className="max-h-60 overflow-y-auto space-y-0.5 custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg transition-colors
                  ${
                    value === option.value
                      ? "bg-(--grad-start) text-white"
                      : "text-(--text-main) hover:bg-(--bg-soft-accent)"
                  }
                `}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main AllTickets Component ---
const AllTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const limit = 8;
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  // Options for Transport Filter
  const transportOptions = [
    { label: "All Transports", value: "" },
    { label: "Bus", value: "Bus" },
    { label: "Train", value: "Train" },
    { label: "Flight", value: "Flight" },
    { label: "Ship", value: "Ship" },
  ];

  // Options for Sorting
  const sortOptions = [
    { label: "Default Sort", value: "" },
    { label: "Price: Low to High", value: "asc" },
    { label: "Price: High to Low", value: "desc" },
  ];

  // Handlers (Updated to accept value directly from CustomDropdown)
  const handleFilterChange = (val) => {
    setFilterType(val);
    setPage(1);
  };

  const handleSortChange = (val) => {
    setSortOrder(val);
    setPage(1);
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "All Tickets",
      page,
      filterType,
      sortOrder,
      fromLocation,
      toLocation,
    ],
    queryFn: async () => {
      let url = `/ticket?page=${page}&limit=${limit}&status=accepted`;
      if (filterType) url += `&transport=${filterType}`;
      if (sortOrder) url += `&sort=${sortOrder}`;
      if (fromLocation) url += `&from=${fromLocation}`;
      if (toLocation) url += `&to=${toLocation}`;
      const { data } = await axiosSecure.get(url);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  const allTickets = data?.tickets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleFromChange = (e) => {
    setFromLocation(e.target.value);
    setPage(1);
  };

  const handleToChange = (e) => {
    setToLocation(e.target.value);
    setPage(1);
  };

  if (isLoading && !isFetching) {
    return (
      <div className="flex justify-center items-center h-screen bg-(--bg-soft-accent)">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 bg-(--bg-soft-accent)">
        <p className="text-red-500 font-bold bg-(--bg-card) px-6 py-3 rounded-xl border border-(--border-card)">
          Failed to load tickets. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-(--grad-start) rounded-full opacity-10 blur-[100px]" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-(--grad-end) rounded-full opacity-10 blur-[100px]" />
        </div>

        {/* Header Section */}
        <div className="text-center py-12 mb-10 px-4 space-y-4 bg-(--bg-card) border border-(--border-card) rounded-3xl shadow-sm">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            All Tickets
          </h1>
          <p className="text-lg md:text-xl text-(--text-muted) max-w-2xl mx-auto font-medium">
            Find your perfect journey. Filter by transport, price, or
            destination.
          </p>
        </div>

        {/* Controls Container */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          {/* Filters & Sort */}
          <div className="flex flex-row gap-4 w-full z-30">
            <div className="w-1/2 lg:w-auto">
              <CustomDropdown
                options={transportOptions}
                value={filterType}
                onChange={handleFilterChange}
                icon={Filter}
                placeholder="All Transports"
              />
            </div>
            <div className="w-1/2 lg:w-auto">
              <CustomDropdown
                options={sortOptions}
                value={sortOrder}
                onChange={handleSortChange}
                icon={ArrowUpDown}
                placeholder="Default Sort"
              />
            </div>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto lg:grow lg:max-w-2xl z-20">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
              <input
                type="text"
                placeholder="From (City/Station)"
                value={fromLocation}
                onChange={handleFromChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all shadow-sm"
              />
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
              <input
                type="text"
                placeholder="To (City/Station)"
                value={toLocation}
                onChange={handleToChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) placeholder:text-(--text-muted) focus:border-(--input-focus) focus:ring-1 focus:ring-(--input-focus) outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Ticket Grid Section */}
        <div className="relative min-h-100 z-10">
          {/* FIX: Use a Single Ternary Logic Chain */}
          {isFetching ? (
            // 1. LOADING STATE (Skeletons ONLY)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <TicketCardSkeleton key={index} />
              ))}
            </div>
          ) : allTickets.length === 0 ? (
            // 2. EMPTY STATE
            <div className="flex flex-col items-center justify-center py-24 bg-(--bg-card) border border-dashed border-(--border-card) rounded-3xl">
              <h3 className="text-xl font-bold text-(--text-muted)">
                No tickets found matching your criteria.
              </h3>
            </div>
          ) : (
            // 3. DATA STATE (Real Tickets)
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-500">
              {allTickets.map((ticket, index) => {
                const formattedPrice = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(ticket.price);

                return (
                  <SingleTicket
                    key={index}
                    ticket={ticket}
                    formattedPrice={formattedPrice}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination Bar */}
        {/* Only show pagination if we have data and aren't loading skeletons */}
        {!isFetching && totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main) hover:border-(--grad-start) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => {
              // Simple Pagination Logic
              if (
                totalPages > 8 &&
                Math.abs(page - (i + 1)) > 2 &&
                i !== 0 &&
                i !== totalPages - 1
              )
                return null;

              return (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`min-w-10 h-10 rounded-lg text-sm font-bold transition-all border ${
                    page === i + 1
                      ? "bg-(--grad-start) text-(--text-inv) border-(--grad-start) shadow-lg shadow-(--grad-start)/20"
                      : "bg-(--bg-card) border-(--border-card) text-(--text-main) hover:border-(--grad-start)"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main) hover:border-(--grad-start) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
