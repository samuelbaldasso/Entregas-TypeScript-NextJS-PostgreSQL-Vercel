export default function ErrorPage({ phrase }: any) {
  return (
    <div style={{ color: "red", display: "flex", justifyContent: "center" }}>
      <h3>{phrase}</h3>
    </div>
  );
}
