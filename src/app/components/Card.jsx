const CardWriter = ({ name, desc, items, image }) => {
  return (
    <div className="w-[208px] overflow-hidden rounded-md bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={image}
        alt={name}
        className="h-[206px] w-full object-cover"
      />

      <div className="px-4 py-4 text-center">
        <h2 className="text-sm font-semibold text-black">{name}</h2>

        <p className="mt-1 text-xs text-gray-500">{desc}</p>

        <p className="mt-2 text-xs font-semibold text-green-600">
          {items} Books
        </p>
      </div>
    </div>
  );
};