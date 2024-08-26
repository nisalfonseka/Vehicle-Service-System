import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <button
        onClick={() => navigate(-1)}
        className="bg-red-700 text-white px-4 py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </button>
    </div>
  );
}

export default BackButton;
