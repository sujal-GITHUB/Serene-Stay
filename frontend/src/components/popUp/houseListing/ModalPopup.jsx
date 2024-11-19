const ModalPopup = () => {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box bg-gray-50 dark:bg-[#303030] ">
        <h3 className="text-base font-medium text-[#222222] dark:text-gray-300">
          Security camera(s)
        </h3>
        <p className="py-4 text-sm text-[#717171]">
        Hosts must disclose the presence of all security cameras and recording devices in their listings. Concealing recording devices or using devices that monitor the interior of bedrooms or bathrooms is strictly prohibited.
        </p>
        <h3 className="text-base font-medium text-[#222222] dark:text-gray-300">Sensors</h3>
        <p className="py-4 text-sm text-[#717171]">
        All sensors at a listing must be properly disclosed, installed, and secured.
        </p>
        <h3 className="text-base font-medium text-[#222222] dark:text-gray-300">
          Emegency Exit
        </h3>
        <p className="py-4 text-sm text-[#717171]">
        Hosts should ensure that emergency exits are clearly marked, accessible, and functional at all times, and should disclose their locations to guests for safety purposes.
        </p>
        <div className="modal-action ">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn dark:bg-zinc-400 dark:text-black ">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default ModalPopup;
