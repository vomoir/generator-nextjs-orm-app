// components/ui/Button.tsx
export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className="bg-blue-500 text-white py-2 px-4 rounded">
            {children}
        </button>
    );
}