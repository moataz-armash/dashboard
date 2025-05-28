// import { redirect } from "next/navigation";

export default function HomePage() {
  return (
    <div className="relative min-h-screen p-12 flex items-center justify-center bg-gray-100">
      <div
        className="bg-green-900 min-h-screen text-white p-10 w-full max-w-7xl rounded-t-3xl"
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 92%, 95% 100%, 5% 100%, 0% 92%)",
        }}
      >
        anything asdfsdf asdfasf safsdfa asdfsadf asfdasfdasdf sadfasdfsd
      </div>
    </div>
  );
  // Redirect to the default dashboard (Company in this case)
  // redirect("/dashboard/company/home");
}
