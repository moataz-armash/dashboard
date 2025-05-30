export default async function LoginPage() {
  return (
    // Screen
    <div className="bg-green-900 h-screen w-full flex justify-center items-center p-8">
      {/* Card */}
      <div className="w-[95%] flex h-full">
        {/* left side */}
        <div className="bg-white flex-1 flex flex-col justify-center items-center">
          {/* <h1 className="text-4xl font-semibold text-brand-800">
            Do your share
          </h1>
          <h4 className="text-xl font-semibold text-brand-800">
            For the environment
          </h4> */}
        </div>
        {/* right side */}
        <div className="bg-brand-100 flex-1"></div>
      </div>
    </div>
  );
}
