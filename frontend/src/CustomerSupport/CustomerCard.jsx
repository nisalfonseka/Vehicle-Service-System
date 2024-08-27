import CustomerSingleCard from "./CustomerSingleCard";

const CustomerCard = ({ customer }) => {
  return (

    <div>


  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Admin Dashboard</h1>
     
     
    </div>
  </div>


<br/>
<br/>
<br/>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {customer.map((item) => (
        <CustomerSingleCard key={item._id} customer={item} />
      ))}
    </div>
    </div>
  );
};

export default CustomerCard;
