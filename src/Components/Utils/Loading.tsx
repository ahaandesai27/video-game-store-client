const LoadingPage = () => {
  return (
    <div className="h-screen bg-black bg-opacity-80 flex items-center justify-center">
      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 opacity-80" />
      <div className="flex flex-col items-center relative z-10">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
        <p className="text-white text-2xl font-bold mt-6">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;