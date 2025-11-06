// src/components/Header.jsx
export default function Header({ name }) {
  return (
    <header className="mb-6">
      <h2 className="text-3xl font-bold">
        Hey there, <span className="text-pink-500">{name || "Student"}!</span>
      </h2>
      <p className="text-gray-500">Ready to learn something awesome today? 🚀</p>
    </header>
  );
}
