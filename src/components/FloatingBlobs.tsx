const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-15%] w-[35rem] h-[35rem] rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-secondary/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
    </div>
  );
};
export default FloatingBlobs;
