import { useOutletContext } from "react-router-dom";
import "./index.css";

const fonts = [
    "Poppins",
    "Inter",
    "Roboto",
    "Lato",
    "Montserrat",
    "Open Sans",
    "Nunito",
    "Raleway",
    "Playfair Display",
    "Merriweather",
    "Oswald",
    "Quicksand",
  ];

export default function Font() {
  const { user, setUser, customFontFamily, setCustomFontFamily } =
    useOutletContext();

  const handleChange = (e) => {
    const font = e.target.value;

    setUser((prevUser) => {
      return { ...prevUser, fontInfo: { ...prevUser?.fontInfo, fontType: font } };
    });

    setCustomFontFamily(font);
  };

  return (
    <div className="box-wrapper">
      <h3>Font</h3>
      <div className="box box-special">
        <div className="font-container">
          <div
            className="font-option-initial"
            style={{
              fontFamily: customFontFamily
            }}>
            Aa
          </div>
          <select
            value={user?.fontInfo?.fontType || "Poppins"}
            onChange={handleChange}
            className="font-dropdown">
            {fonts?.map((font) => (
              <>
                <option key={font} value={font}>
                  {font}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
