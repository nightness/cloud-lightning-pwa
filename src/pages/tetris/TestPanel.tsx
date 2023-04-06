import { Block } from ".";

export default function TestPanel() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="I" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="I" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="I" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="I" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="J" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="J" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="J" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="J" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="L" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="L" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="L" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="L" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="O" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="O" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="O" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="O" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="T" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="T" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="T" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="T" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="S" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="S" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="S" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="S" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="Z" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="Z" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="Z" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="Z" orientation={270} style={{ padding: "10px" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Block blockType="X!" orientation={0} style={{ padding: "10px" }} />
        <Block blockType="X!" orientation={90} style={{ padding: "10px" }} />
        <Block blockType="X!" orientation={180} style={{ padding: "10px" }} />
        <Block blockType="X!" orientation={270} style={{ padding: "10px" }} />
      </div>
    </>
  );
}
