"use client";
import PublisherCard from "@/components/cards/PublisherCard";
import PageTitle from "@/app/components/PageTitle";

export default function PublishersClient({ publishers = [] }) {
  return (
    <section className="container">
      <PageTitle title={["সকল প্রকাশক", "All Publishers", "جميع الناشرين"]} />
      <div className="flex flex-wrap justify-center md:justify-start">
        {publishers.map((publisher) => (
          <PublisherCard key={publisher._id} publisher={publisher} />
        ))}
        {publishers.length === 0 && <p className="text-gray-500 mt-10">No publishers found</p>}
      </div>
    </section>
  );
}
