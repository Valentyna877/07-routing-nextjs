// export default function Loading() {
//     return <p>Loading, please wait...</p>;
// }

import css from "@/components/Loader/Loader.module.css";

export default function Loader({ message = "Loading, please wait..." }) {
  return (
    <div className={css.loader} role="status" aria-live="polite">
      <div className={css.spinner}></div>
      <p>{message}</p>
    </div>
  );
}