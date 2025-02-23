export default function Button({ children, onClick, className = "" }) {
    return (
      <button onClick={onClick} className={`px-4 py-2 rounded bg-primary text-white transition duration-300 hover:bg-orange-600 ${className}`}>
        {children}
      </button>
    );
  }