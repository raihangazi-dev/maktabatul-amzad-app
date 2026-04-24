export const metadata = { title: "Maktabatul Amzad - About" };

export default function AboutPage() {
  return (
    <section className="container">
      <div className="my-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">About Maktabatul Amzad</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Maktabatul Amzad is a premier Islamic bookstore dedicated to providing authentic Islamic literature
            to readers across Bangladesh and beyond. We specialize in books on Islamic jurisprudence, theology,
            spirituality, and contemporary Islamic thought.
          </p>
          <p>
            Our collection features works by renowned scholars and thinkers, available in Bengali, English,
            and Arabic. We are committed to making Islamic knowledge accessible to everyone.
          </p>
          <p>
            Located in the heart of Dhaka&apos;s book district at Banglabazar, we have been serving our community
            since our founding. Our dedicated team works tirelessly to curate the finest Islamic literature
            from publishers across the world.
          </p>
          <div className="mt-8 p-6 bg-gray-50 border-l-4 border-primary">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p>Address: North brook hall road, Banglabazar, Dhaka</p>
            <p>Email: maktabatulamjad@gmail.com</p>
            <p>Phone: +8801749-669155</p>
          </div>
        </div>
      </div>
    </section>
  );
}
