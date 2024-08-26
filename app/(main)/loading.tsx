import AppLoader from "@/common/Loaders/AppLoader";

export default function Loading() {
  return (
    <div className="h-96 sm:h-60 w-dvw flex flex-col mx-auto hx-auto font-bold">
      <AppLoader />
    </div>
  );
}
