import "./index.css";
import TailwindBackgroundColors from "./tailwindBackgroundColors";
import TailwindFilters from "./tailWindFilters";
import TailwindGrids from "./tailwindGrids";
import TailwindResponsiveDesign from "./tailwindResponsiveDesign";
import TailwindSpacing from "./tailwindSpacing";
import TailwindTypography from "./tailwindTypography";


export default function TailwindLab() {
    return (
      <>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Tailwind CSS</h1>
        </div>
  
        <TailwindSpacing />
        <TailwindTypography />
        <TailwindBackgroundColors />
        <TailwindResponsiveDesign />
        <TailwindFilters />
        <TailwindGrids />
      </>
    );
  }
