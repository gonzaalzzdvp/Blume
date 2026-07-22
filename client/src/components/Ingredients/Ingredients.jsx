import Hydration from "./Hydration";
import Daily from "./Daily";
import Volume from "./Volume";
import Curly from "./Curly";
import Violet from "./Violet";

export default function Ingredients({ categorySlug }) {

  switch (categorySlug) {

    case "hidratacion":
      return <Hydration />;

    case "diario":
      return <Daily />;

    case "volumen":
      return <Volume />;

    case "rizos":
      return <Curly />;

    case "violeta":
      return <Violet />;

    default:
      return null;
  }
}