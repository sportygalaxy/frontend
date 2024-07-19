import AppLoader from "@/common/Loaders/AppLoader";

export default function Loading() {
  return (
    <div className="flex w-full h-dvh mx-auto hx-auto font-bold">
      <AppLoader />
    </div>
  );
}
