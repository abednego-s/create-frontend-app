const LoadingSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="w-full h-4 bg-gray-300 rounded-md"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default LoadingSkeleton;
