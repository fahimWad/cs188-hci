import PageNav from "../flashcard_components/PageNav";

const Graph: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <PageNav />
            <h1 className="text-2xl font-bold mb-4">Graph Component</h1>
            <p className="text-gray-700">This is a placeholder for the graph component.</p>
            {/* Add your graph rendering logic here */}
        </div>
    );
}

export default Graph;