import React from "react";
import { Page } from "../components";
import { I, J, L, O, S, T, Z } from "./blocks";

export default function Tetris() {
  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <I orientation={0} style={{ padding: '10px' }} />
        <I orientation={90} style={{ padding: '10px' }} />
        <I orientation={180} style={{ padding: '10px' }} />
        <I orientation={270} style={{ padding: '10px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <J orientation={0} style={{ padding: '10px' }} />
        <J orientation={90} style={{ padding: '10px' }} />
        <J orientation={180} style={{ padding: '10px' }} />
        <J orientation={270} style={{ padding: '10px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <L orientation={0} style={{ padding: '10px' }} />
        <L orientation={90} style={{ padding: '10px' }} />
        <L orientation={180} style={{ padding: '10px' }} />
        <L orientation={270} style={{ padding: '10px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <O orientation={0} style={{ padding: '10px' }} />
        <O orientation={90} style={{ padding: '10px' }} />
        <O orientation={180} style={{ padding: '10px' }} />
        <O orientation={270} style={{ padding: '10px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <S orientation={0} style={{ padding: '10px' }} />
        <S orientation={90} style={{ padding: '10px' }} />
        <S orientation={180} style={{ padding: '10px' }} />
        <S orientation={270} style={{ padding: '10px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: "row" }}>
        <Z orientation={0} style={{ padding: '10px' }} />
        <Z orientation={90} style={{ padding: '10px' }} />
        <Z orientation={180} style={{ padding: '10px' }} />
        <Z orientation={270} style={{ padding: '10px' }} />
      </div>
    </Page>
  );
}
