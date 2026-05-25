"use client";
import PublisherCard from "@/components/cards/PublisherCard";
import PageTitle from "@/app/components/PageTitle";

export default function PublishersClient({ publishers = [] }) {
  return (
    <section className="container">
      <PageTitle title={["সকল প্রকাশক", "All Publishers", "جميع الناشرين"]} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {publishers.map((publisher) => (
          <PublisherCard key={publisher._id} publisher={publisher} />
        ))}
        {publishers.length === 0 && <p className="col-span-full mt-10 text-gray-500">No publishers found</p>}
      </div>
    </section>
  );
}
