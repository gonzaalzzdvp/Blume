export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <main className=" flex items-center bg-white px-6">
      <div className="w-full p-8">
        <div className="mb-8 ">
          <h1 className="text-4xl text-(--blackBean) font-clash-bold">
            Blume
          </h1>
          <h2 className="mt-6 text-2xl font-clash-light">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-gray-500 font-ranade-regular">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </main>
  );
}