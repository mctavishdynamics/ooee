import { FC } from "react";

import styles from "./Debug.module.css";

interface DebugProps {
  data: Record<string, unknown>;
}

export const Debug: FC<DebugProps> = ({ data }) => {
  return (
    <div className={styles.Debug}>
      <table>
        <tbody>
          {Object.keys(data).map((key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{JSON.stringify(data[key])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
