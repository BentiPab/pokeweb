
import TypesForm from "./TypesForm.jsx";

const SideBar = ({onTypeFilter}) => {


  return (
    <div className="sidebar">
      <TypesForm onTypeFilter={onTypeFilter}/>
    </div>
  );
};

export default SideBar;
