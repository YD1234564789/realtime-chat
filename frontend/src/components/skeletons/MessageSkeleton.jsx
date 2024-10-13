const MessageSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-stone-400"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-40 bg-stone-400"></div>
          <div className="skeleton h-4 w-40 bg-stone-400"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40 bg-stone-400"></div>
        </div>
        <div className="skeleton h-10 w-10 rounded-full shrink-0 bg-stone-400"></div>
      </div>
    </>
  );
};

export default MessageSkeleton