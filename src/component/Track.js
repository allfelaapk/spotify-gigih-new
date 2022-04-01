import React, { useEffect, useState } from "react";
import "../App.css";

const Track = ({ track }) => {
  const [btnSelect, setBtnSelect] = useState(false);

  const handleBtnSelect = () => {
    setBtnSelect(!btnSelect);
    let selected = JSON.parse(localStorage.getItem("data"));
    if (btnSelect === false) {
      selected[track.id] = track;
    } else {
      delete selected[track.id];
    }
    localStorage.setItem("data", JSON.stringify(selected));
  };

  useEffect(() => {
    let current_selected = JSON.parse(localStorage.getItem("data"));
    if (current_selected[track.id]) {
      setBtnSelect(true);
    } else {
      setBtnSelect(false);
    }
  }, [track]);
  console.log(track);
  return (
    <table className="card">
      <tbody>
        <tr>
          <td>
            <img className="image-opt" src={track.album.images[1].url} />
            <h3 className="artist">{track.artists[0].name}</h3>
            <p className="name">{track.name}</p>

            <div>
              <button className="btn" onClick={handleBtnSelect}>
                {btnSelect ? "deselected" : "select"}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Track;

// export default function Track({ img, artist, title }) {
//   return (
//     <table className="card">
//       <tbody>
//         <tr>
//           <td>
//             <img className="image-opt" src={img} />
//             <h3 className="artist">{artist}</h3>
//             <p className="name">{title}</p>

//             <div>
//               <button className="btn">Select</button>
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }
