/* eslint-disable react/prop-types */
const PriceWithTaxCard = ({ style, setShowBeforeTaxPrice }) => {
  return (
    <div className={`${style}`}>
      <p className=" text-s text-[#222222] mr-3 font-medium">
        Add Tax
      </p>
      <input
        type="checkbox"
        className="toggle"
        onClick={() => {
          setShowBeforeTaxPrice((prev) => !prev);
        }}
      />
    </div>
  );
};

export default PriceWithTaxCard;
