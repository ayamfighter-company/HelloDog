import React, { useState, useEffect } from "react";
import { 
  Dog, 
  Stethoscope, 
  MapPin, 
  Calendar, 
  Heart, 
  LogIn,
  ShieldAlert,
  Image as ImageIcon, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronRight,
  Phone,
  Video,
  Search,
  Upload,
  AlertCircle,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { identifyDogBreed, identifyDisease, ScanResult } from "@/src/services/aiService";
import { VET_CLINICS, ADOPTION_LISTINGS } from "@/src/constants/data";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

// --- Types ---
type View = "landing" | "dashboard" | "scanner" | "vet-map" | "booking" | "adoption" | "gallery" | "consultation" | "login" | "admin";



// --- Components ---
 
const ConsultationSim = ({ onEnd }: { onEnd: () => void }) => {
  
  return (
    <div className="fixed inset-0 z-[100] bg-secondary flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {/* Main Video (Nurse/Vet) */}
        <img 
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover"
          alt="Vet"
        />
        <div className="absolute top-8 left-8 bg-black/40 backdrop-blur rounded-2xl p-4 border border-white/10">
          <p className="text-white font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live: Dr. Sarah (BB Vet)
          </p>
        </div>

        {/* Small Video (User) */}
        <div className="absolute bottom-24 right-8 w-48 h-64 bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
           <img 
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400" 
            className="w-full h-full object-cover" 
            alt="My Dog"
           />
           <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-[10px] text-white">Your Camera</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-8 flex items-center justify-center gap-8">
        {[
          { icon: Menu, color: "bg-white/10" },
          { icon: Video, color: "bg-white/10 text-white" },
          { icon: Phone, color: "bg-red-500 text-white hover:bg-red-600", onClick: onEnd },
          { icon: AlertCircle, color: "bg-white/10" }
        ].map((btn, i) => (
          <button key={i} onClick={btn.onClick} className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-all", btn.color)}>
            <btn.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
};

const GalleryView = () => {
  const images = [
    new URL('./images/anjing1.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing2.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing3.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing4.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing5.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing6.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing7.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing8.jpeg.jpeg', import.meta.url).href,
    new URL('./images/anjing9.jpeg.jpeg', import.meta.url).href,
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-display font-bold">Community <span className="text-primary italic">Snaps</span></h2>
          <p className="text-slate-500 mt-2">Check out the happy puppers of Pangkalpinang.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Post New
        </button>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {images.map((src, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="break-inside-avoid"
          >
             <img src={`${src}?auto=format&fit=crop&q=80&w=400`} className="w-full rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-zoom-in" alt="Dog" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BookingSystem = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {step === 1 ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
             <h2 className="text-5xl font-display font-bold italic">Schedule a Visit</h2>
             <p className="text-slate-500">Select the type of care your companion needs today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { id: "checkup", name: "General Checkup", p: "Rp 150.000", t: "30-45 mins", icon: Stethoscope },
               { id: "vax", name: "Vaccination", p: "Rp 350.000", t: "20 mins", icon: CheckCircle2 },
               { id: "dental", name: "Dental Care", p: "Rp 600.000", t: "60 mins", icon: ArrowRight },
               { id: "grooming", name: "Grooming & Spa", p: "Rp 200.000", t: "90 mins", icon: Dog }
             ].map((svc) => (
               <button 
                 key={svc.id}
                 onClick={() => setSelectedService(svc.id)}
                 className={cn(
                   "p-8 rounded-[2.5rem] border-2 text-left transition-all",
                   selectedService === svc.id ? "border-primary bg-primary/5 shadow-xl scale-[1.02]" : "bg-white border-slate-100 hover:border-slate-200"
                 )}
               >
                 <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", selectedService === svc.id ? "bg-primary text-white" : "bg-slate-50 text-slate-400")}>
                   <svc.icon className="w-6 h-6" />
                 </div>
                 <div className="flex justify-between items-end mb-2">
                    <h4 className="text-xl font-bold text-secondary">{svc.name}</h4>
                    <span className="text-lg font-bold text-primary">{svc.p}</span>
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{svc.t} — Pangkalpinang Branch</p>
               </button>
             ))}
          </div>

          {selectedService && (
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-secondary text-white p-6 rounded-[1.5rem] font-bold text-xl hover:bg-slate-800 transition-all shadow-xl"
            >
              Confirm Service Selection
            </button>
          )}
        </div>
      ) : (
        <div className="text-center space-y-8 animate-in zoom-in duration-500 p-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl">
           <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12" />
           </div>
           <div>
              <h2 className="text-4xl font-display font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-slate-500">Your appointment at <strong>BB Vet Alexander</strong> has been scheduled.</p>
           </div>
           <div className="bg-slate-50 p-6 rounded-[1.5rem] border text-left space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Date & Time</span>
                <span className="font-bold">May 15, 2026 — 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Order ID</span>
                <span className="font-mono font-bold">#HD-2910-BB</span>
              </div>
           </div>
           <button 
             onClick={() => setStep(1)}
             className="w-full bg-primary text-white p-5 rounded-2xl font-bold shadow-lg shadow-primary/20"
           >
             Go to My Bookings
           </button>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const role = localStorage.getItem("user_role"); // Ambil data role yang sedang login

const navItems: { label: string; view: View; icon: any }[] = [
  { label: "Dashboard", view: "dashboard", icon: LayoutDashboard },
  { label: "Health AI", view: "scanner", icon: Stethoscope },
  { label: "Vet Map", view: "vet-map", icon: MapPin },
  { label: "Gallery", view: "gallery", icon: ImageIcon },
  { label: "Adoption", view: "adoption", icon: Heart },
  
  
  ...(role === "super_admin" 
    ? [{ label: "Admin Panel", view: "admin" as View, icon: ShieldAlert }] 
    : []
  ),

  
  ...(!role 
    ? [{ label: "Login", view: "login" as View, icon: LogIn }] 
    : []
  ),
];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b" : "bg-transparent text-white"
    )}>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("landing")}>
        <div className="bg-primary p-2 rounded-xl">
          <Dog className="w-6 h-6 text-white" />
        </div>
        <span className={cn("text-2xl font-bold font-display tracking-tight", isScrolled ? "text-secondary" : "text-white")}>
          Hellodog
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              currentView === item.view ? "text-primary" : (isScrolled ? "text-slate-600" : "text-white/80")
            )}
          >
            {item.label}
          </button>
        ))}
        {localStorage.getItem("user_role") && (
  <button
    onClick={() => {
      localStorage.removeItem("user_role");
      alert("Kamu telah keluar dari akun.");
      window.location.reload();
    }}
    className="text-sm font-medium text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 px-3 py-2 rounded-xl transition-colors"
  >
    Logout
  </button>
)}
        <button
        onClick={() => {
          // 1. Atur status simulasi premium di sini bro
          const userPremium = false; // Ganti jadi true kalau mau ngetes akun premium sukses

          if (userPremium) {
            alert("🎉 Akses Terbuka! Silakan tentukan jadwal dan jam temu konsultasi dengan dokter hewan pilihanmu, bro.");
            setView("booking"); // Jalur asli template lu buat pindah halaman
          } else {
            alert("🔒 Fitur Khusus Member Premium! Ayo upgrade akun HelloDog anda ke Premium buat bisa booking jam temu dokter hewan secara instan.");
          }
        }}
        className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-primary/80 transition-colors"
      >
        {/* Tulisan tombol otomatis berubah sesuai status */}
        {false ? "📅 Book Appointment" : "🔒 Premium Only"}
      </button>
      </div>

      <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu className={isScrolled ? "text-secondary" : "text-white"} />}
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b shadow-xl p-6 flex flex-col gap-4 text-secondary md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => { setView(item.view); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={() => { setView("booking"); setMobileMenuOpen(false); }}
              className="mt-2 bg-primary text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStart }: { onStart: (v: View) => void }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-secondary">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-light text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live in Pangkalpinang, BB
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-white leading-tight mb-6">
            The Future of <span className="text-primary italic">Pet Care</span> is Here.
          </h1>
          <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
            Hellodog combines state-of-the-art AI with local veterinarian expertise in Pangkalpinang to give your dog the care they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onStart("scanner")}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group"
            >
              Try AI Health Scanner
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onStart("consultation")}
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5 text-primary" />
              Live Consult
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
             <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-secondary overflow-hidden bg-slate-800">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                ))}
             </div>
             <div>
                <p className="text-white font-bold">2,400+ Pets Served</p>
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
             </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative"
        >
          <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000" 
              alt="Happy Dog"
              className="w-full h-full object-cover"
            />
            {/* Overlay features */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-10 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl"
            >
               <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg"><Stethoscope className="w-5 h-5 text-white" /></div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest">AI Status</p>
                    <p className="text-sm text-white font-bold">Detection Active</p>
                  </div>
               </div>
            </motion.div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
};

const Dashboard = () => {
  const [isPremium, setIsPremium] = React.useState(false); // Ganti true kalau mau coba mode premium
const [aiChatCount, setAiChatCount] = React.useState(0);
  const data = [
    { name: 'Mon', consultations: 12, bookings: 4 },
    { name: 'Tue', consultations: 19, bookings: 7 },
    { name: 'Wed', consultations: 15, bookings: 12 },
    { name: 'Thu', consultations: 22, bookings: 8 },
    { name: 'Fri', consultations: 30, bookings: 15 },
    { name: 'Sat', consultations: 25, bookings: 10 },
    { name: 'Sun', consultations: 18, bookings: 5 },
  ];

  const COLORS = ['#0066FF', '#000000', '#6366f1', '#f43f5e'];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight">Main Dashboard</h2>
          <p className="text-slate-500">Welcome back to Hellodog Pangkalpinang.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Date</p>
          <p className="text-xl font-bold text-secondary">{new Date().toDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Consultations", value: "24", sub: "+12% this week", icon: Video },
          { label: "Upcoming Bookings", value: "8", sub: "3 today", icon: Calendar },
          { label: "AI Scans", value: "142", sub: "Pangkalpinang area", icon: Stethoscope },
          { label: "Adoptions", value: "12", sub: "3 pending", icon: Heart },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg italic">
                {stat.sub}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-secondary tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
          <h3 className="text-xl font-bold mb-6">Consultation Activity</h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Bar dataKey="consultations" fill="#141414" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="bookings" fill="#0066FF" radius={[6, 6, 0, 0]} barSize={12} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
          <h3 className="text-xl font-bold mb-6">Service Distribution</h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Health Scanning', value: 45 },
                      { name: 'Vet Finder', value: 25 },
                      { name: 'Booking', value: 20 },
                      { name: 'Adoption', value: 10 },
                    ]}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[0,1,2,3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
        <div className="p-8 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold">Recent Vet Listings</h3>
          <button className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Clinic Name</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {VET_CLINICS.map((clinic) => (
  <tr key={clinic.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
    <td className="px-8 py-5 font-bold text-secondary">{clinic.name}</td>
    <td className="px-8 py-5">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Open Now
      </span>
    </td>
    <td className="px-8 py-5 text-sm text-slate-600">{clinic.address}</td>
    <td className="px-8 py-5 text-sm font-medium">{clinic.phone}</td>
    
    {/* --- INI TOMBOL SPECIAL PREMIUM YANG KITA TAMBAHKAN --- */}
    <td className="px-8 py-5 text-sm">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Biar gak bentrok ama fungsi klik baris tabelnya
          if (isPremium) {
            alert(`🎉 Berhasil! Janji temu kamu dengan ${clinic.name} sudah dijadwalkan. Dokter kami akan segera menghubungi nomor hp-mu bro!`);
          } else {
            alert(`🔒 Fitur Premium, bro! Yuk langganan premium dulu buat bisa booking jam temu dokter hewan pilihanmu secara instan.`);
          }
        }}
        className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${
          isPremium 
            ? "bg-primary text-white hover:bg-primary/80" 
            : "bg-slate-200 text-slate-500 cursor-not-allowed"
        }`}
      >
        {isPremium ? "📅 Buat Janji" : "🔒 Premium Only"}
      </button>
    </td>
    {/* ---------------------------------------------------- */}
  </tr>
))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AIScanner = () => {
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [mode, setMode] = useState<"breed" | "disease">("breed");
  const [symptoms, setSymptoms] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (event) => setFile(event.target?.result as string);
    if (e.target.files?.[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleScan = async () => {
    if (!file && mode === "breed") return;
    setLoading(true);
    try {
      const base64 = file?.split(',')[1];
      let res;
      if (mode === "breed" && base64) {
        res = await identifyDogBreed(base64);
      } else {
        res = await identifyDisease(base64, symptoms);
      }
      setResult(res);
    } catch (e) {
      alert("Error scanning. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-display font-bold">Pet Health <span className="text-primary italic">AI</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Upload a photo of your dog or describe symptoms. Our AI will analyze and provide instant insights inspired by local vet expertise.</p>
      </div>

      <div className="flex justify-center flex-wrap gap-2">
        {["breed", "disease"].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m as any); setResult(null); }}
            className={cn(
              "px-8 py-3 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest",
              mode === m ? "bg-secondary text-white shadow-xl scale-105" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            )}
          >
            {m === "breed" ? "Breed Scanner" : "Symptom Analysis"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className={cn(
            "relative aspect-[4/3] rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-8",
            file ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
          )}>
            {file ? (
              <>
                <img src={file} className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-[2rem]" alt="Upload" />
                <button 
                  onClick={() => setFile(null)}
                  className="absolute top-8 right-8 bg-white/80 backdrop-blur p-2 rounded-xl text-red-500 hover:bg-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center text-center group">
                <Upload className="w-16 h-16 text-slate-300 mb-4 transition-transform group-hover:-translate-y-2" />
                <p className="text-lg font-bold text-secondary">Drop image or click to upload</p>
                <p className="text-sm text-slate-500 mt-1">Accepts JPG, PNG for breed & disease analysis</p>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            )}
          </div>

          {mode === "disease" && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Describe Symptoms (Optional)</label>
              <textarea
                placeholder="E.g., lethargic, scratching ears, watery eyes..."
                className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px]"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={loading || (!file && mode === "breed")}
            className="w-full bg-primary text-white p-5 rounded-[1.5rem] font-bold text-xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? "Analyzing with AI..." : `Start Scan — ${mode === "breed" ? "Breed" : "Diagnosis"}`}
          </button>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 border border-slate-200 border-dashed rounded-[2.5rem] h-full flex flex-col items-center justify-center p-12 text-center text-slate-400"
              >
                <AlertCircle className="w-12 h-12 mb-4" />
                <p className="font-bold">Awaiting Scan Input</p>
                <p className="text-sm mt-2">The AI results will appear here after the analysis is complete.</p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    AI Insight
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-500">Confidence:</span>
                    <span className="text-lg font-bold text-primary">{Math.round(result.confidence * 100)}%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl font-bold font-display">{result.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{result.description}</p>
                </div>

                {result.characteristics && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-secondary uppercase text-sm tracking-widest">Key Characteristics</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.characteristics.map((c, i) => (
                        <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-semibold">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.firstAid && (
                  <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 space-y-4">
                    <h4 className="font-bold text-amber-800 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5" />
                      Immediate First Aid Actions
                    </h4>
                    <ul className="space-y-3">
                      {result.firstAid.map((step, i) => (
                        <li key={i} className="flex gap-3 text-amber-900 text-sm italic">
                          <CheckCircle2 className="w-5 h-5 shrink-0 text-amber-500" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendation && (
                  <div className="bg-primary p-6 rounded-3xl text-white space-y-2">
                    <h4 className="font-bold text-sm uppercase tracking-widest opacity-80">Recommendation</h4>
                    <p className="font-semibold leading-relaxed">{result.recommendation}</p>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold pt-4 border-t">
                  Disclaimer: AI results are not medical advice. Consult a local vet in Pangkalpinang for clinical diagnosis.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AdoptionPortal = () => {
 
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-display font-bold">Adopt a <span className="text-primary italic">Friend</span></h2>
          <p className="text-slate-500 mt-2">Find your perfect companion from local shelters in Bangka Belitung.</p>
        </div>
        <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Search breed/location..." 
              className="bg-white border rounded-2xl px-6 py-3 min-w-[300px] outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="bg-secondary text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ADOPTION_LISTINGS.map((dog) => (
          <motion.div 
            key={dog.id}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-[2.5rem] border overflow-hidden shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
               <img src={dog.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dog.name} />
               <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary">
                 {dog.location.split(',')[0]}
               </div>
               <div className="absolute bottom-6 left-6 right-6 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-[1.5rem] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <p className="text-white text-sm italic">{dog.description}</p>
               </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-display font-bold">{dog.name}</h3>
                    <p className="text-slate-500 font-medium">{dog.breed}</p>
                  </div>
                  <button className="p-3 bg-slate-50 rounded-2xl hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Age</p>
                    <p className="font-bold text-secondary">{dog.age}</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Gender</p>
                    <p className="font-bold text-secondary">{dog.gender}</p>
                 </div>
              </div>

              <button className="w-full bg-secondary text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors group">
                Inquire Adoption
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const VetMap = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-96 bg-white border-r flex flex-col shadow-xl z-10 relative">
        <div className="p-8 border-b space-y-4">
           <h2 className="text-3xl font-display font-bold">Local <span className="text-primary italic">Vets</span></h2>
           <p className="text-sm text-slate-500">Showing licensed clinics in Pangkalpinang, Bangka Belitung.</p>
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search clinics..." className="w-full bg-slate-50 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
           {VET_CLINICS.map(clinic => (
             <div key={clinic.id} className="p-6 rounded-3xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-secondary pr-2">{clinic.name}</h4>
                  <div className="flex items-center text-amber-500 text-xs font-bold gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-current" />
                    {clinic.rating}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{clinic.address}</p>
                <div className="flex items-center gap-3">
                   <button className="flex-1 bg-white border border-slate-200 text-slate-600 rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
                     <Phone className="w-3 h-3" />
                     {clinic.phone.split('-')[0]}..
                   </button>
                   <button className="bg-primary text-white p-2 rounded-xl hover:scale-105 transition-transform">
                     <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
      <div className="flex-1 relative bg-slate-100">
         {/* Placeholder for Map - In real app, integrate google-maps-react */}
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <MapPin className="w-8 h-8 text-primary" />
               </div>
            <div className="w-[72vw] xl:w-[75vw] h-[87vh] min-h-[580px] rounded-3xl overflow-hidden shadow-xl border relative z-10 -mt-20 lg:-mt-28 ml-auto mr-0 flex justify-stretch items-stretch">
  <iframe
    src="https://maps.google.com/maps?q=Pangkalpinang,%20Bangka%20Belitung&t=&z=13&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full"
  ></iframe>
</div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Main Root Component ---

export default function App() {
  const [view, setView] = useState<View>("landing");

  return (
    <div className="min-h-screen font-sans antialiased text-secondary bg-white">
      <Navbar currentView={view} setView={setView} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div 
              key="landing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={setView} />
              
              {/* Features Quick Look */}
              <section className="py-24 bg-white">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                       <div className="max-w-xl">
                          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Service Ecosystem</p>
                          <h2 className="text-5xl font-display font-bold">Care that feels like <span className="text-primary italic">magic</span>, powered by science.</h2>
                       </div>
                       <p className="text-slate-500 max-w-xs md:text-right">Everything you need for your pet is now in one professional platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {[
                         { title: "AI Health Scanner", desc: "Scan symptoms and detect potential issues using our Gemini-powered engine.", icon: Stethoscope, color: "bg-blue-50 text-blue-600" },
                         { title: "Veterinary Map", desc: "Find licensed clinics in Pangkalpinang with real-time hours and contact info.", icon: MapPin, color: "bg-slate-50 text-secondary" },
                         { title: "Hospital Booking", desc: "Skip the queue and book appointments directly through our streamlined system.", icon: Calendar, color: "bg-primary/10 text-primary" },
                       ].map((feat, i) => (
                         <div key={i} className="group p-10 rounded-[3rem] border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all">
                            <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8", feat.color)}>
                               <feat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed font-medium">{feat.desc}</p>
                            <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all cursor-pointer">
                               Learn More <ChevronRight className="w-4 h-4" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </section>

              {/* Simple Footer */}
              <footer className="bg-secondary text-white py-20">
                 <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
                    <div className="col-span-2 space-y-6">
                       <div className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-xl">
                          <Dog className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold font-display tracking-tight">Hellodog</span>
                       </div>
                       <p className="text-white/40 max-w-xs">Building the most trusted pet healthcare ecosystem in Pangkalpinang, BB.</p>
                       <div className="flex gap-4">
                          {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />)}
                       </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-xs opacity-50">Quick Links</h4>
                        <ul className="space-y-4 font-semibold text-white/80">
                          <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                          <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                          <li className="hover:text-primary cursor-pointer transition-colors">Vet Partnership</li>
                        </ul>
                    </div>
                    <div className="space-y-6 text-right">
                        <p className="text-xl font-bold">Made with ❤️ for Pangkalpinang.</p>
                        <p className="text-white/40 text-sm">© 2026 Hellodog SaaS Platform. All Rights Reserved.</p>
                    </div>
                 </div>
              </footer>
            </motion.div>
          )}

          {view !== "landing" && (
            <motion.div 
               key="content" 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0, y: 20 }}
               className="pt-24 min-h-screen bg-slate-950 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950"
            >
               {view === "dashboard" && <Dashboard />}
               {view === "scanner" && <AIScanner />}
               {view === "vet-map" && <VetMap />}
               {view === "adoption" && <AdoptionPortal />}
               {view === "gallery" && <GalleryView />}
               {view === "booking" && <BookingSystem />}
               {/* --- HALAMAN LOGIN ELEGAN --- */}
          {view === "login" && (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
              <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">HelloDog Account</h2>
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  if (target[0].value === 'admin@hellodog.com') {
                    localStorage.setItem("user_role", "super_admin"); 
                    alert("Selamat Datang, Admin!");
                  } else {
                    localStorage.setItem("user_role", "adopter"); 
                    alert("Login Berhasil!");
                  }
                  window.location.reload();
                }} className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input type="email" placeholder="contoh@email.com" className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5 uppercase tracking-wider">Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-xl font-bold mt-4 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* --- HALAMAN ADMIN DASHBOARD (FINAL DESIGN + PROTECTED) --- */}
          {view === "admin" && (
            
            localStorage.getItem("user_role") !== "super_admin" ? (
              <div className="flex flex-col items-center justify-center p-12 text-center min-h-[60vh]">
                <div className="p-4 bg-red-500/10 rounded-full text-red-500 mb-4 animate-bounce">
                  <ShieldAlert size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Akses Ditolak!</h2>
                <p className="text-slate-500 max-w-sm mb-6">Halaman ini dilindungi secara ketat. Anda tidak memiliki izin sebagai Super Admin untuk melihat data ini.</p>
                <button onClick={() => setView("dashboard")} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all">
                  Kembali ke Dashboard
                </button>
              </div>
            ) : (
              
              <div className="p-8 max-w-6xl mx-auto text-slate-800">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500 text-white rounded-2xl shadow-md shadow-red-500/20">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Control Center</h1>
                      <p className="text-slate-500 text-sm mt-0.5">Manajemen database terpusat untuk aplikasi HelloDog</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      localStorage.removeItem("user_role"); // Fungsi Logout Admin
                      alert("Logged out successfully");
                      window.location.reload();
                    }} className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-rose-100">
                      Logout Admin
                    </button>
                  </div>
                </div>
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Anjing</span>
                    <p className="text-4xl font-extrabold text-slate-950 mt-1">12 <span className="text-sm font-medium text-slate-400">Ekor</span></p>
                    <div className="mt-3 text-xs text-emerald-600 font-medium">● Terhubung ke phpMyAdmin</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Antrean Adopsi</span>
                    <p className="text-4xl font-extrabold text-amber-500 mt-1">3 <span className="text-sm font-medium text-slate-400">Pemohon</span></p>
                    <div className="mt-3 text-xs text-slate-500">Butuh persetujuan admin</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Server</span>
                    <p className="text-4xl font-extrabold text-emerald-500 mt-1">Active</p>
                    <div className="mt-3 text-xs text-slate-500">Laragon MySQL Engine Online</div>
                  </div>
                </div>

                {/* Database Table Simulator */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Daftar Adopsi Masuk</h3>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">+ Tambah Data Anjing</button>
                  </div>
                  <div className="p-6 text-center text-slate-400 text-sm">
                    [Tabel Data MySQL dari Laragon akan muncul di sini secara dinamis setelah API terhubung]
                  </div>
                </div>
              </div>
            )
          )}
            </motion.div>
          )}

          {view === "consultation" && <ConsultationSim onEnd={() => setView("dashboard")} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
