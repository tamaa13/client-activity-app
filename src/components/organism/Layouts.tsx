import Navbar from "../atoms/Navbar";

type LayoutsProps = {
    children: React.ReactNode;
};

const Layouts: React.FC<LayoutsProps> = ({ children }) => {
    return (
        <div className="h-full w-screen">
            <Navbar />
            {children}
        </div>
    );
};

export default Layouts;