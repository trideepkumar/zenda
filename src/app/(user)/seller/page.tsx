"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Tag, AlignLeft, IndianRupee, Grid2x2, MapPin,
  User, Phone, Camera, X, AlertCircle, CheckCircle2,
  ChevronDown, Upload, Sparkles,
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Electronics", "Fashion & Clothing", "Food & Groceries",
  "Furniture & Home", "Bikes & Scooters", "Cars & Vehicles",
  "Real Estate", "Pets & Animals", "Jobs", "Services & Other",
];

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const MAX_PHOTOS = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// ── Types ──────────────────────────────────────────────────────────────────

interface PhotoSlot {
  id: number;
  file: File | null;
  preview: string | null;
  error: string | null;
}

interface FormValues {
  title: string;
  description: string;
  price: string;
  category: string;
  state: string;
  name: string;
  mobile: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  state?: string;
  name?: string;
  mobile?: string;
  photos?: string;
}

// ── Validation ─────────────────────────────────────────────────────────────

function validate(values: FormValues, photos: PhotoSlot[]): FormErrors {
  const e: FormErrors = {};
  if (!values.title.trim()) e.title = "Title is required";
  else if (values.title.trim().length < 10) e.title = "Title must be at least 10 characters";
  else if (values.title.trim().length > 100) e.title = "Title must be under 100 characters";

  if (!values.description.trim()) e.description = "Description is required";
  else if (values.description.trim().length < 20) e.description = "Description must be at least 20 characters";
  else if (values.description.trim().length > 2000) e.description = "Description must be under 2000 characters";

  if (!values.price.trim()) e.price = "Price is required";
  else if (isNaN(Number(values.price)) || Number(values.price) < 0) e.price = "Enter a valid price";
  else if (Number(values.price) > 10000000) e.price = "Price seems too high";

  if (!values.category) e.category = "Select a category";
  if (!values.state) e.state = "Select a state / region";

  if (!values.name.trim()) e.name = "Your name is required";
  else if (values.name.trim().length < 2) e.name = "Name too short";

  if (!values.mobile.trim()) e.mobile = "Mobile number is required";
  else if (!/^[6-9]\d{9}$/.test(values.mobile.replace(/\s/g, "")))
    e.mobile = "Enter a valid 10-digit Indian mobile number";

  if (!photos.some((p) => p.file)) e.photos = "Add at least one photo";

  return e;
}

// ── Photo Slot Component ───────────────────────────────────────────────────

function PhotoSlotCard({
  slot,
  index,
  onAdd,
  onRemove,
}: {
  slot: PhotoSlot;
  index: number;
  onAdd: (id: number, file: File) => void;
  onRemove: (id: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isCover = index === 0;

  const handleFile = (file: File) => onAdd(slot.id, file);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />

      {slot.preview ? (
        <div className="relative group aspect-square rounded-2xl overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slot.preview} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
          <button
            type="button"
            onClick={() => onRemove(slot.id)}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
          >
            <X className="h-3.5 w-3.5 text-gray-700" />
          </button>
          {isCover && (
            <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-[#7F77DD] text-white px-2 py-0.5 rounded-full">
              Cover
            </span>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            "aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all",
            "hover:border-[#7F77DD] hover:bg-[#EEEDFE]/40 group",
            slot.error ? "border-red-400 bg-red-50/40" : "border-border bg-muted/30"
          )}
        >
          {isCover ? (
            <>
              <div className="h-10 w-10 rounded-xl bg-[#EEEDFE] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Camera className="h-5 w-5 text-[#7F77DD]" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">Cover photo</span>
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 text-muted-foreground group-hover:text-[#7F77DD] transition-colors" />
              <span className="text-[11px] text-muted-foreground font-medium">Photo {index + 1}</span>
            </>
          )}
          <span className="text-[10px] font-bold text-muted-foreground/60 bg-muted/60 px-2 py-0.5 rounded-full">
            0{index + 1}
          </span>
        </button>
      )}

      {slot.error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />{slot.error}
        </p>
      )}
    </div>
  );
}

// ── Field wrapper ──────────────────────────────────────────────────────────

function Field({
  label, required, error, hint, children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-[#7F77DD]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3 shrink-0" />{error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

const inputCls = (error?: string) =>
  cn(
    "w-full rounded-xl border bg-muted/40 px-4 py-3 text-sm text-foreground outline-none transition-all",
    "placeholder:text-muted-foreground/60",
    "focus:ring-2 focus:ring-[#7F77DD]/30 focus:border-[#7F77DD]",
    error ? "border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-400" : "border-input"
  );

// ── Section wrapper ────────────────────────────────────────────────────────

function Section({
  icon: Icon, title, children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border bg-muted/20">
        <div className="h-7 w-7 rounded-lg bg-[#EEEDFE] flex items-center justify-center">
          <Icon className="h-3.5 w-3.5 text-[#7F77DD]" />
        </div>
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>
      <div className="p-5 flex flex-col gap-5">{children}</div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function AddListingPage() {
  const [values, setValues] = useState<FormValues>({
    title: "", description: "", price: "",
    category: "", state: "", name: "", mobile: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<PhotoSlot[]>(
    Array.from({ length: MAX_PHOTOS }, (_, i) => ({ id: i, file: null, preview: null, error: null }))
  );

  const photoCount = photos.filter((p) => p.file).length;

  const set = (key: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const updated = { ...values, [key]: e.target.value };
    setValues(updated);
    if (touched[key]) {
      const errs = validate(updated, photos);
      setErrors((prev) => ({ ...prev, [key]: errs[key] }));
    }
  };

  const blur = (key: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const errs = validate(values, photos);
    setErrors((prev) => ({ ...prev, [key]: errs[key] }));
  };

  const addPhoto = useCallback((id: number, file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, error: "Only JPG or PNG allowed" } : p));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, error: "File exceeds 5 MB" } : p));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotos((prev) =>
        prev.map((p) => p.id === id ? { ...p, file, preview: e.target?.result as string, error: null } : p)
      );
      setErrors((prev) => ({ ...prev, photos: undefined }));
    };
    reader.readAsDataURL(file);
  }, []);

  const removePhoto = useCallback((id: number) => {
    setPhotos((prev) => prev.map((p) => p.id === id ? { ...p, file: null, preview: null, error: null } : p));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(values).reduce(
      (acc, k) => ({ ...acc, [k]: true }), {} as typeof touched
    );
    setTouched(allTouched);
    const errs = validate(values, photos);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-[#EEEDFE] flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-[#7F77DD]" />
        </div>
        <h2 className="text-xl font-bold">Listing submitted!</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Your ad is under review and will go live shortly. We'll notify you once it's approved.
        </p>
        <button
          onClick={() => { setSubmitted(false); setValues({ title:"",description:"",price:"",category:"",state:"",name:"",mobile:"" }); setPhotos(Array.from({length:MAX_PHOTOS},(_,i)=>({id:i,file:null,preview:null,error:null}))); setErrors({}); setTouched({}); }}
          className="mt-2 px-6 py-2.5 bg-[#7F77DD] hover:bg-[#534AB7] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Post another ad
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="mx-auto max-w-2xl">

        {/* Page header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#7F77DD] flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-foreground">Post your ad</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Fill in the details below to list your item</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* ── Listing Details ── */}
          <Section icon={Tag} title="Listing Details">
            <Field label="Ad Title" required error={errors.title} hint={`${values.title.length}/100 characters`}>
              <input
                type="text"
                placeholder="e.g. Samsung Galaxy S22 — mint condition"
                maxLength={100}
                value={values.title}
                onChange={set("title")}
                onBlur={blur("title")}
                className={inputCls(errors.title)}
              />
            </Field>

            <Field label="Description" required error={errors.description} hint={`${values.description.length}/2000 characters`}>
              <textarea
                placeholder="Describe your item — condition, features, reason for selling…"
                rows={5}
                maxLength={2000}
                value={values.description}
                onChange={set("description")}
                onBlur={blur("description")}
                className={cn(inputCls(errors.description), "resize-none leading-relaxed")}
              />
            </Field>

            <Field label="Price" required error={errors.price}>
              <div className="relative flex items-center">
                <span className={cn(
                  "absolute left-4 flex items-center gap-0.5 text-sm font-semibold pointer-events-none",
                  errors.price ? "text-red-400" : "text-[#7F77DD]"
                )}>
                  <IndianRupee className="h-3.5 w-3.5" />
                </span>
                <input
                  type="number"
                  placeholder="0"
                  min={0}
                  value={values.price}
                  onChange={set("price")}
                  onBlur={blur("price")}
                  className={cn(inputCls(errors.price), "pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none")}
                />
              </div>
            </Field>
          </Section>

          {/* ── Category ── */}
          <Section icon={Grid2x2} title="Category">
            <Field label="Category" required error={errors.category}>
              <div className="relative">
                <select
                  value={values.category}
                  onChange={set("category")}
                  onBlur={blur("category")}
                  className={cn(inputCls(errors.category), "appearance-none pr-10 cursor-pointer")}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
          </Section>

          {/* ── Location ── */}
          <Section icon={MapPin} title="Location">
            <Field label="State / Region" required error={errors.state}>
              <div className="relative">
                <select
                  value={values.state}
                  onChange={set("state")}
                  onBlur={blur("state")}
                  className={cn(inputCls(errors.state), "appearance-none pr-10 cursor-pointer")}
                >
                  <option value="">Select a location</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
          </Section>

          {/* ── Contact Info ── */}
          <Section icon={User} title="Contact Info">
            <Field label="Your Name" required error={errors.name}>
              <input
                type="text"
                placeholder="Full name"
                value={values.name}
                onChange={set("name")}
                onBlur={blur("name")}
                className={inputCls(errors.name)}
              />
            </Field>

            <Field label="Mobile Number" required error={errors.mobile} hint="10-digit Indian mobile number">
              <div className="relative flex items-center">
                <span className={cn(
                  "absolute left-4 text-sm font-semibold pointer-events-none select-none border-r pr-3",
                  errors.mobile ? "text-red-400 border-red-300" : "text-foreground border-border"
                )}>
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={values.mobile}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 10); setValues((prev) => ({ ...prev, mobile: v })); if (touched.mobile) { const errs = validate({ ...values, mobile: v }, photos); setErrors((prev) => ({ ...prev, mobile: errs.mobile })); } }}
                  onBlur={blur("mobile")}
                  className={cn(inputCls(errors.mobile), "pl-16")}
                />
                <Phone className="absolute right-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
          </Section>

          {/* ── Photos ── */}
          <Section icon={Camera} title="Photos">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                JPG, JPEG or PNG · Max 5 MB each · Up to 4 photos
              </p>
              <span className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-full",
                photoCount === MAX_PHOTOS
                  ? "bg-[#EEEDFE] text-[#534AB7]"
                  : "bg-muted text-muted-foreground"
              )}>
                {photoCount} / {MAX_PHOTOS}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((slot, i) => (
                <PhotoSlotCard
                  key={slot.id}
                  slot={slot}
                  index={i}
                  onAdd={addPhoto}
                  onRemove={removePhoto}
                />
              ))}
            </div>

            {errors.photos && (
              <p className="text-xs text-red-500 flex items-center gap-1.5">
                <AlertCircle className="h-3 w-3 shrink-0" />{errors.photos}
              </p>
            )}
          </Section>

          {/* ── Submit ── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-8">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 h-12 rounded-xl border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-[#7F77DD] hover:bg-[#534AB7] active:scale-[0.98] text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Post Ad
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}