export default function Avatar({
  profilePic,
  className,
}: {
  profilePic?: string | null;
  className?: string;
}) {
  return (
    <div className={`w-10 h-full rounded-full overflow-hidden ${className}`}>
      <img src={profilePic ?? "/pfpfallback.png"} alt="avatar" />
    </div>
  );
}
