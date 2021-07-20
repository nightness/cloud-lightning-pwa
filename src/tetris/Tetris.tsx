import React from "react";
import { Page } from "../components";
import { I, J, L, O, S, T, Z } from "./blocks";

export default function Tetris() {
  return (
    <Page>
      <I orientation={0} /><br/>
      <J orientation={0} /><br/>
      <L orientation={0} /><br/>
      <O orientation={0} /><br/>
    </Page>
  );
}
