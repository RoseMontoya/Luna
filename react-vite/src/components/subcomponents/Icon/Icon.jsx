import * as Icons from "react-icons/fa6";
import "./Icon.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllIcons } from "../../../redux/icons";

function Icon({ id }) {
  const iconsObj = useSelector((state) => state.icons.allIcons);
  const dispatch = useDispatch();
  const icon = iconsObj ? Object.values(iconsObj) : [];
  // console.log("ahhhhh",iconsObj)

  useEffect(() => {
      if (!iconsObj) {
          dispatch(getAllIcons());
        }
    }, [iconsObj, dispatch]);

    if (!iconsObj) return null;

    const IconComponent = Icons[icon[id].name]
    // console.log(IconComponent)
  return <IconComponent />;
}

export default Icon;
