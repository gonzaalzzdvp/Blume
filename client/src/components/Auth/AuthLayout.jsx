export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <main className="min-h-screen flex justify-center items-center bg-white px-6">
      <div className="w-full max-w-md border border-(--citron) rounded-2xl p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-4xl text-(--blackBean)">
            Blume
          </h1>

          <h2 className="mt-6 text-2xl font-semibold">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        {children}

      </div>
    </main>
  );
}