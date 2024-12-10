import React from "react";
import BgremovalContext from "./bgRemovalContext";

function BgRemovalState(props) {
  return (
    <BgremovalContext.Provider value={{}}>
      {props.children}
    </BgremovalContext.Provider>
  );
}

export default BgRemovalState;
