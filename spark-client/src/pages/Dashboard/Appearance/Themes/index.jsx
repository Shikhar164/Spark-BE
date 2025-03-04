import { useOutletContext } from "react-router-dom";
import "./index.css";

const themes = [
  {
    id: 1,
    label: "Air Snow",
    value: "AIR_SNOW",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FAirSnow.png?alt=media&token=d354cfa8-f1c5-4d40-8dba-71a92b1aa155",
  },
  {
    id: 2,
    label: "Air Grey",
    value: "AIR_GREY",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FAirGrey.png?alt=media&token=0b8b510e-8e81-43c4-bcd1-e7df1c3d0607",
  },
  {
    id: 3,
    label: "Air Smoke",
    value: "AIR_SMOKE",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FAirSmoke.png?alt=media&token=d29215e7-edcc-4fbb-bb5a-b06f836967e8",
  },
  {
    id: 4,
    label: "Air Black",
    value: "AIR_BLACK",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FAirBlack.png?alt=media&token=f9c1ca05-8578-4fd0-ada8-832268b3434b",
  },
  {
    id: 5,
    label: "Mineral Blue",
    value: "MINERAL_BLUE",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FMineralBlue.png?alt=media&token=d6c8a36f-c994-4453-9a2b-3cfb5acf5c4c",
  },
  {
    id: 6,
    label: "Mineral Green",
    value: "MINERAL_GREEN",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FMineralGreen.png?alt=media&token=95112cb3-9565-4af4-9e6a-53c9cddc73a8",
  },
  {
    id: 7,
    label: "Mineral Orange",
    value: "MINERAL_ORANGE",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/themes%2FMineralOrange.png?alt=media&token=5b779af6-6c6b-4816-a6fc-2a822eb46bc8",
  },
];

export default function Themes() {
  const { setUser, customThemeStyle, setCustomThemeStyle } = useOutletContext();

  const handleChange = (e) => {
    const theme = e.target.value;
    console.log(theme);
    setUser((prevUser) => {
      return { ...prevUser, themeStyle: theme };
    });
    setCustomThemeStyle(theme);
  };
  
  return (
    <div className="box-wrapper">
      <h3>Themes</h3>
      <div className="box box-special">
        <div className="themes-container">
          {themes?.map((theme) => (
            <div className="theme" key={theme}>
              <div
                className={`theme-option ${
                  theme.value === customThemeStyle ? "selected" : ""
                }`}
                style={{
                  backgroundImage: `url(${theme.imageUrl})`,
                  backgroundSize: "cover",
                  height: 122,
                  width: 80,
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChange({ target: { value: theme.value } })
                }></div>
                <p className="smaller">{theme.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
