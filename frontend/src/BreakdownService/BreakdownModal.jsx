import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiBookOpen, BiLogoTiktok, BiParagraph, BiPin, BiUserCircle } from 'react-icons/bi';
import { BiCar } from 'react-icons/bi';
import { BiPhone } from 'react-icons/bi';

const BreakdownModal = ({ breakdownRequest, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {breakdownRequest.customerName}
        </h2>
        <h4 className='my-2 text-gray-500'>{breakdownRequest._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{breakdownRequest.customerName}</h2>
      </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiCar className='text-red-300 text-2xl' />
          <h2 className='my-1'>{breakdownRequest.vehicleNumber}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiPhone className='text-red-300 text-2xl' />
          <h2 className='my-1'>{breakdownRequest.contactNumber}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiBookOpen className='text-red-300 text-2xl' />
          <h2 className='my-1'>{breakdownRequest.issueType}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiPin className='text-red-300 text-2xl' />
          <h2 className='my-1'>{breakdownRequest.status}</h2>
        </div>
      </div>
    </div>
  );
};

export default BreakdownModal;
